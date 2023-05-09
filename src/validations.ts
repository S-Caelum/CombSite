const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export async function EmailValidation(email: string) {
  var emailToLower = email.toLowerCase();
  if (emailToLower.match(re)) {
    return true;
  } else {
    return false;
  }
};

export async function BirthDayValidation(birthDay: string) {
  var birthDayToDate = new Date(birthDay);
  var minimalDate = new Date("01/12/1950");
  if (birthDayToDate > new Date()) {
    return false;
  } else if (birthDayToDate < minimalDate) {
    return false;
  } else {
    return true;
  }
}

