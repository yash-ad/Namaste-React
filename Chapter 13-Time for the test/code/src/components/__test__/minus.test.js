import { minus } from "../minus";

test("Substract the number using `minus function`",()=>{
const result = minus(5,1)

//Assetion:-
//expect(result).toBe(3) //Expexted:3,Received:4;
expect(result).toBe(4) //Passed the test.
});