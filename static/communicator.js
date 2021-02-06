const communicator = async function() {
    console.log('Button pressed');
    const result = await axios({
        method: 'post',
        url: 'http://192.168.0.141:3000/whatever',
        params: {
            action: "Button pressed"
        }
    });
    console.log(result);
}
