exports.getDate = () =>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yy = String(today.getFullYear()).substr(2);

    today = mm + '/' + dd + '/' + yy;      
    console.log(today)
    return(today);
}
