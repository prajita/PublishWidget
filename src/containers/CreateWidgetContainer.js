import React, {Component} from "react";
import { Form } from 'semantic-ui-react';
import '../style.css';
import { Button } from 'react-bootstrap';
import DropdownSingleSelect from "../components/DropdownSingleSelect";

const categoryOptions = [
  { label: "cat1", value: "cat1" },
  { label: "cat2", value: "cat2" },
  { label: "cat3", value: "cat3" },
  { label: "cat4", value: "cat4" }
];

export default class  CreateWidgetContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
          
          widgetObj: {
            title:  "",
            shortDesc: "",
            category: ""
          }
    
        }
        this.updateWidgetData=this.updateWidgetData.bind(this);
        this.submitCreateWidget = this.submitCreateWidget.bind(this);
       
    
      }
    
    updateWidgetData(value, name){
        this.setState({widgetObj: { name : value}});
    }

    submitCreateWidget() {
        const { title, shortDesc, status, createdOn, category, approvedOn, publishedOn }=this.state;
        let obj =
        {
          title,
          shortDesc,
          status,
          createdOn,
          category,
          approvedOn,
          publishedOn,
          
        }
        console.log("input to create Widget api ::::" + JSON.stringify(obj));
    
        //this.props.submitCreateWidget(obj);
    
      }
    render(){
        const { widgetObj } = this.state;
        const {title, shortDesc} = widgetObj;
        return(
        <div>
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
                        isMulti
                        isClearable
                        placeholder={"Select options..."}
                        update={val => this.updateWidgetData(val, "category")}
                    />
                  </div>
                </div>
                <Button className= "submit-btn-style" variant="secondary" 
                  onClick={this.submitCreateWidget} type="submit"> Create Widget</Button>
          
            </Form>
        </div>
        );
    }
}
