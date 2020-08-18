$(document).ready(function(){
    let dpa = 0

    for (i = 0; i < users.length; i ++) {
        dpa += users[i].daily_pa
    }

    console.log(dpa)

})