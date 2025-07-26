import Person from "./Person.js";

class Admin extends Person {
  // Static
  protected static role: string = "Admin";

  public constructor(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    sexe: boolean,
    _securiySocialNumber: string
  ) {
    super(username, firstname, lastname, email, sexe, _securiySocialNumber);
  }

  public greet() {
    console.log(`Hello my name is ${this.firstname} ${this.getLastName()}`);
    console.log(`Please contact me with my email : ${this.email}`);
    console.log(`Sexe: ${this.sexe ? "Male" : "Female"}`);
    console.log(`Je suis une administratrice, voici mon role : `, Admin.role);
    console.log(`My ID scurity is : ${this.securiySocialNumber}`);
  }
}

export default Admin;
