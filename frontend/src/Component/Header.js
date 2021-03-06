import React from "react";
import "../CSS/react-header.css"
import {Button, Input, Select} from 'antd'
import { Menu, Dropdown,Upload,message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Progress,Modal,Image} from 'antd';
import { Radio } from 'antd';
const {confirm,info}=Modal;

class UserArea extends React.Component{

    state = {
        percent: 0,
    };
    constructor(props){


        super(props);
    }
    componentDidMount() {
        let task=this.props.task
        let level=parseInt((parseInt(task)+2)/3);
        let progress=(parseInt(task)+2-3*level)/3*100;
        this.setState({
            progress:progress
        })
    }
    handleclick=()=>{
        let chosen=0;
        let task=this.props.task
        let level=parseInt((parseInt(task)+2)/3);
        let setturtle=this.props.setturtle;
        let options=[
            { label: <Image
                    width={60}
                    src={require("../assets/turtle.png")}
                />, value: 1,disabled:false },
            { label: <Image
                    width={60}
                    src={require("../assets/level2.png")}
                />, value: 2,disabled:false },
            { label: <Image
                    width={60}
                    src={require("../assets/level3.png")}
                />, value: 3,disabled:false },
            { label: <Image
                    width={60}
                    src={require("../assets/level4.png")}
                />, value: 4,disabled:false },
            { label: <Image
                    width={60}
                    src={require("../assets/level5.png")}
                />, value: 5,disabled:false },
            { label: <Image
                    width={60}
                    src={require("../assets/level6.png")}
                />, value: 6,disabled:false }
        ];
        for(let i=0;i<6;i++){
            if(i+1>level){
                options[i].disabled=true;
            }
        }
        confirm({
            title: "选择乌龟皮肤",
            bodyStyle:{TextAlign:"center"},
            content:
                <div>
                    <Radio.Group
                        options={options}
                        onChange={(value)=>{chosen=value;}}
                    />
                    <br />
                </div>,
            onOk(){
                if(chosen===0){
                    return;
                }
                setturtle(parseInt(chosen.target.value));
            },
            onCancel() {
                return;
            },
        });
    }

    render(){

        if(!this.props.login){
            return(
                <div className="userarea">
                    <Button className="tologin" type="primary" shape="round" onClick={()=>this.props.openlogin()}>登录</Button>
                    &nbsp;
                    <Button className="toregister" type="primary" shape="round" onClick={()=>this.props.openregister()}>注册</Button>
                </div>
            )
        }
        else{
            let task=this.props.task
            let level=parseInt((parseInt(task)+2)/3);
            let progress=(parseInt(task)+2-3*level)/3*100;



            return(
                <div className="userarea" >
                    <div style={{width:window.innerHeight*0.07,float:"left",cursor:"pointer"}} onClick={()=>this.handleclick()}>
                    <Progress className="progress" width={window.innerHeight*0.06} type="circle" status="exception" percent={progress} format={() => "Lv"+level} />
                    </div>
                    <div style={{float:"left",paddingTop:window.innerHeight*0.01}}>
                    <Button shape="round" type="primary" onClick={()=>this.props.logout()}>logout</Button>
                    </div>
                </div>
            )
        }
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        let importfile=this.props.importfile;
        let uploadconfig = {
            name: 'file',
            beforeUpload(file){
                if (file.name.indexOf(".logo")===-1) {
                    message.error(`${file.name} is not a logo file`);
                    return false;
                }
                const reader=new FileReader();
                reader.readAsText(file);
                reader.onload=(result)=>{
                    importfile(result.target.result)
                }
                return true;
            },
            showUploadList:false


        };
        let menu = (
            <Menu>
                <Menu.Item>
                    <Upload {...uploadconfig} accept=".logo" id="uploader">
                    <a target="_blank" rel="noopener noreferrer" >
                        导入文件
                    </a>
                    </Upload>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={()=>this.props.exportfile()}>
                        导出文件
                    </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="header-content">
                <img src={require("../assets/logo.png")} className="logo"/>
                <ul className="toolbar">
                    <li className="toolbar-item">
                        <Dropdown overlay={menu}>
                            <a className="toolbar-item-clicked" onClick={e => e.preventDefault()}>
                                文件 <DownOutlined />
                            </a>
                        </Dropdown>
                    </li>
                    <li className="toolbar-item">
                        <a className="toolbar-item-clicked"
                           onClick={()=>{this.props.run()}}>运行</a>
                    </li>
                    <li className="toolbar-item">
                        <a className="toolbar-item-clicked"
                           onClick={()=>{this.props.cleardrawingpanel()}}>清屏</a>
                    </li>
                    <li className="toolbar-item">
                        <a className="toolbar-item-clicked"
                           onClick={()=>{this.props.openhelp()}}>帮助</a>
                    </li>
                </ul>
                <UserArea logout={this.props.logout} login={this.props.login} username={this.props.username} openlogin={this.props.openlogin} task={this.props.task} openregister={this.props.openregister} setturtle={(turtle)=>{this.props.setturtle(turtle)}}/>
            </div>
        );
    }
}

export default Header;
