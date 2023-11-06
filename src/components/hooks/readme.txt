let's improve User Experience of sending the requests 
Checkout and Products components and Coupon Button they all need to send http request, they then also in the end need to deal with
the received data ( fail, loading, success ).
It is the same logic we need in different components to update the UI, since it is stateful logic that impacts the UI,
we need a custom hook, just creating a custom standard function won't do the trick 

Inside of this hook, we make the Http requests, the request should not always be sent right when the component to which this hook 
belongs rendered, we sometimes need to make http request, when a form is submitted like in the checkout component

Therefore, as a first step, we need a utility function sendHttpRequest(url,config) that works with sending the http request logic 
we need another nested function that is sendRequest(url,config) which updates state based on the data received by the request 
and we return an object which exposes the data, isLoading, error state to which ever component is using this hook 
and those componets can use these state and benefit from the state changes 

We need to call this hook in different places, in Checkout component it should be called when form is submitted,  
but in Products component it needs to be called when the component is rendered 

We can expose the sendRequest method to the components and they can call it whenever they like, which is a lot simpler
but to make it more convenient, We can use useEffect inside we call sendRequest, since we are updating state in sendRequest 
we should wrap the function inside a useCallback. 

To control when the sendRequest is called we can add a check condition 
( (config && (config.method === 'GET' || !config.method )) || !config )

The sendRequest is executed rightaway for the GET requests but for the other requests we expose sendRequest for
those other components to execute it whenever they want 
