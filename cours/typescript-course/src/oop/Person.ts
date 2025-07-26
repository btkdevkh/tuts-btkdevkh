interface Employee {
  sexe: boolean;
  login: () => void;
}

export abstract class Lead {
  protected _securiySocialNumber: string;

  public constructor(number: string) {
    this._securiySocialNumber = number;
  }

  public get securiySocialNumber() {
    return this._securiySocialNumber;
  }
}

class Person extends Lead implements Employee {
  // Properties
  public username: string;
  public firstname: string;
  protected lastname: string;
  public email: string;
  public sexe: boolean;

  // Static
  protected static role: string = "user";

  // Constructor
  public constructor(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    sexe: boolean,
    _securiySocialNumber: string
  ) {
    super(_securiySocialNumber);
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.sexe = sexe;
  }

  // Methods
  public greet() {
    console.log(`Hello my name is ${this.firstname} ${this.getLastName()}`);
    console.log(`Please contact me with my email : ${this.email}`);
    console.log(`Sexe: ${this.sexe ? "Male" : "Female"}`);
    console.log(
      `Je suis un utilisateur normal, voici mon role : `,
      Person.role
    );
    console.log(`My ID scurity is : ${this.securiySocialNumber}`);
  }

  protected getLastName() {
    return this.lastname;
  }

  public login() {
    console.log("Je suis loggé!");
  }

  // Getters
  public get userName() {
    return this.username;
  }
  public get firstName() {
    return this.firstname;
  }
  public get lastName() {
    return this.lastname;
  }
  public get emailUser() {
    return this.email;
  }

  // Setters
  public set userName(userNmame: string) {
    this.username = userNmame;
  }
  public set firstName(firstName: string) {
    this.firstname = firstName;
  }
  public set emailUser(email: string) {
    this.email = email;
  }
}

export default Person;
