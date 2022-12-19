import React, {Component} from "react";
import { Form } from 'semantic-ui-react';
import '../style.css';
import DropdownSingleSelect from "../components/DropdownSingleSelect";
import { fetchWidgetsApi } from "../utils/fetchDetails";
import { ButtonComponent } from "../components/ButtonComponent";
import { fetchDate } from "../utils/fetchDate";

const categoryOptions = [
  { label: "cat1", value: "cat1" },
  { label: "cat2", value: "cat2" },
  { label: "cat3", value: "cat3" },
  { label: "cat4", value: "cat4" }
];
export default class  WidgetModalContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
          
          widgetObj: {
            _id: props.widgetData._id||null,
            title:  props.widgetData.title || "",
            shortDesc: props.widgetData.shortDesc || "",
            category: props.widgetData.category || "",
            createdOn: "",
            status: "",
            approvedOn: "",
            publishedOn: ""
          }
    
        }
        this.updateWidgetData=this.updateWidgetData.bind(this);
        this.submitWidgetData = this.submitWidgetData.bind(this);
      
      }
    
    updateWidgetData(value, name){
      const key = `${name}`;
      this.setState({widgetObj: { ...this.state.widgetObj, [key] : value}});
    }

    submitWidgetData() {
        const { editType, submitUpdateWidget, submitCreateWidget } = this.props;
        const { title, shortDesc, createdOn, category, approvedOn, publishedOn, _id }=this.state.widgetObj;
        let obj =
            { 
                _id,
                title,
                shortDesc,
                status: "created",
                createdOn,
                category,
                approvedOn,
                publishedOn 
            }
        if(editType){
            obj.status = "updated";
            console.log("input to update Widget api ::::" + JSON.stringify(obj));
            submitUpdateWidget(obj);
        }else{
            obj.createdOn = fetchDate();
            console.log("input to create Widget api ::::" + JSON.stringify(obj));
            submitCreateWidget(obj);
        }
    
      }
    render(){
        const { editType} = this.props;
        const { widgetObj } = this.state;
        const {title, shortDesc, category} = widgetObj;
        
        return(
        <div className="modal-widget">
          <div className="modal-title">Add new Widget</div>
            <Form id="form1" style={{ width: "600px" }} >
                <div className="row">
                    <div className="col-3">
                    <label > Title </label>
                    </div>
                    <div className="col-9">
                    <input type="text" id="title" placeholder="Enter title.." value={title}
                        onChange={(e) => this.updateWidgetData(e.target.value, "title")} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                    <label > Short Desc </label>
                    </div>
                    <div className="col-9">
                    <input type="text" id="shortDesc" placeholder="Enter shortDesc.." value={shortDesc}
                        onChange={(e) => this.updateWidgetData(e.target.value, "shortDesc")} />
                    </div>
                </div>

                <div className="row">
                  <div className="col-3">
                    <label >Category</label>
                  </div>
                  <div className="col-6">
                    <DropdownSingleSelect 
                        options={categoryOptions} 
                        menuHeight={110}
                        isClearable
                        placeholder={"Select options..."}
                        value = {category}
                        update={val => this.updateWidgetData(val, "category")}
                    />
                  </div>
                </div>
                <ButtonComponent className= "submit-btn-style"  variant="contained"
                  onClick={this.submitWidgetData} type="submit"> {editType? "Update" : "Create"}</ButtonComponent>
          
            </Form>
        </div>
        );
    }
}
