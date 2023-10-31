import { useCallback, useEffect } from "react";
import { useState } from "react";

// function that makes the actual http request 
async function sendHttpRequest(url,config){
    const response = await fetch(url, config);

    const resData = await response.json();

    if( !response.ok ){
        throw new Error(resData.message || 'Something went wrong');
    }
    return resData;
}

function useHttp(url , config, initialData) {
    // state for managing different states of request ( loading, error, success )
    const [data, setData] = useState(initialData);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    
    function clearData(){
        setData(initialData);
    }

    // sendRequest() utility ufunction that updates the state based on the data that is received after the request 


    const sendRequest = useCallback(
        async function sendRequest(data){
            setIsLoading(true);
            try{ 
                const resData = await sendHttpRequest(url,{...config,body:data} );
                // for POST request we need payload in the body, so adding payload to the config object which 
                // we are sending from checkout component  
                setData(resData);
            }catch(err){
                setError(err.message || 'Something is Wrong');
            }
            setIsLoading(false);
        },
        [url,config]
    );

    useEffect(()=>{

        // for GET http requests we make the http request right away as the component renders ( i.e., for product component )
        // where as for checkout we have to make the http request only when the user submit the checkout form so we
        // expose the sendRequest() and make the call in the Checkout component 

        if( (config && (config.method === 'GET' || !config.method ) ) || !config )
            sendRequest();
    },[sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}

export default useHttp
