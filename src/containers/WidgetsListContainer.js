import React, { Component } from "react";
import WidgetCard from "./WidgetCard";


class WidgetsListContainer extends Component{

    render() {
        let showData = [];
        const {onClickEditWidget,onClickDeleteWidget, approveWidget, publishWidget, list, isApprover } = this.props;
        if (list && list.length > 0) {
          list.map((each, index) => {
            showData.push(
                <WidgetCard 
                    isApprover={isApprover}
                    key={index} 
                    indexKey={index} 
                    data={each} 
                    onClickEditWidget={onClickEditWidget}
                    onClickDeleteWidget={onClickDeleteWidget}
                    approveWidget={approveWidget}
                    publishWidget={publishWidget}
                  />
              )
          })
        }
    
        return (
          <div className="widget-container">
              {showData}
          </div>
    
        )
      }
    }    
export default WidgetsListContainer;