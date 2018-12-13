export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
export function validateZipCode(zip) {
    var re = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
    return re.test(zip);
}

//TODO add documentation and make this script as reusable as possible.