import Tabs from "@ac-ui/tabs";
import TabPane from "@ac-ui/tab-pane";
import Button from "@ac-ui/button";
import Icon from "@ac-ui/icon";
import Option from "@ac-ui/option";
import Select from "@ac-ui/select";
import Input from "@ac-ui/input";
import Card from "@ac-ui/card";
import Message from "@ac-ui/message";
import Upload from "@ac-ui/upload";
import Drawer from "@ac-ui/drawer";
import Tag from "@ac-ui/tag";
import Radio from "@ac-ui/radio";
import Text from "@ac-ui/textarea";
// import Blogitem from "@ac-ui/blogitem"
import FormItem from "@ac-ui/form-item";
import Form from "@ac-ui/form";
import { App } from "vue";

const components = [
    Tabs,
    TabPane,
    Button,
    Icon,
    Option,
    Select,
    Input,
    Card,
    Upload,
    Drawer,
    Tag,
    Radio,
    Text,
//     Blogitem
FormItem,
    Form,
]

const install = (app:App)=>{
    components.forEach(element => {
        app.component(element.name,element)
    });

    app.config.globalProperties.$message = Message
}

export default {
    install
}