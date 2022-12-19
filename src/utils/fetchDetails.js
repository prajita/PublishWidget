const URL = "http://localhost:3005/api/widgets";
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
                console.log("api response:::::", data)
                callback(data);
            }
        ).catch(e => console.log('request failed::' + e));


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


