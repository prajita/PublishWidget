const PORT = 3000;
const URL = `http://localhost:${PORT}/api/widgets`;
const loginURL =`http://localhost:${PORT}/login`;

export const fetchWidgetsApi = callback => {
    fetch(URL,
        {
            method: "GET", 
            cache: "no-cache",
            headers: {
                'name': "Content-Type",
                'value': "application/json"
            }
        }
    )
        .then(
            res => res.json())
        .then(
            data => {
                callback(data.widgets);
            }
        ).catch(e => callback(e));


}

export const createWidgetApi = (requestObj, callback) => {
    fetch(URL,
        {
            method: "POST", 
            cache: "no-cache",
            headers: {
                'name': "Content-Type",
                'content-type': 'application/json',
                'value': "application/json"
            },
            body: JSON.stringify(requestObj)
        }
    )
        .then(
            res => res.json())
        .then(
            data => {
                console.log("api response:::::", data)
                callback(data);
            }
        ).catch(e => console.log('request failed::' + e));

}

export const updateWidgetApi = (requestObj, callback)=>{
    fetch(`${URL}/${requestObj._id}`,
    {
        method: "PUT", 
        cache: "no-cache",
        headers: {
            'name': "Content-Type",
            'content-type': 'application/json',
            'value': "application/json"
        },
        body: JSON.stringify(requestObj)
    }
)
    .then(
        res => res.json())
    .then(
        data => {
            console.log("api response:::::", data)
            callback(data);
        }
    ).catch(e => console.log('request failed::' + e));
}
export const deleteWidgetApi = (widgetId, callback)=>{
    fetch(`${URL}/${widgetId}`,
    {
        method: "DELETE", 
        cache: "no-cache",
        headers: {
            'name': "Content-Type",
            'content-type': 'application/json'
        }
    }
)
    .then(
        res => res.json())
    .then(
        data => {
            console.log("api response:::::", data)
            callback(data);
        }
    ).catch(e => console.log('request failed::' + e));
}

export const approveWidgetApi =(id, callback)=>{
    callStatusUpdateApi(id, "approved", callback);
}

export const publishWidgetApi =(id, callback)=>{
    callStatusUpdateApi(id, "published", callback);
}



export const rejectWidgetApi =(id, callback)=>{
    callStatusUpdateApi(id, "rejected", callback);  
}

export const callStatusUpdateApi = (id, status, callback)=>{
    fetch(`${URL}/${status}/${id}`,
    {
        method: "PUT", 
        cache: "no-cache",
        headers: {
            'name': "Content-Type",
            'content-type': 'application/json'
        }
    }
    )
    .then(
        res => res.json())
    .then(
        data => {
            console.log("api response:::::", data)
            callback(data);
        }
    ).catch(e => console.log('request failed::' + e));
}

export const requestLoginApi = async (requestObj, callback)=>{
    fetch(loginURL,
    {
        method: "POST", 
        cache: "no-cache",
        headers: {
            'name': "Content-Type",
            'content-type': 'application/json',
            'value': "application/json"
        },
        body: JSON.stringify(requestObj)
    }
    )
    .then(
        res => res.json())
    .then(
        data => {
            console.log("api response:::::", data)
            callback(data);
        }
    ).catch(e => callback(e));
}
