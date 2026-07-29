export type LoginCase = {
  username :string;
  password :string;
  expectedResult :string;
} 
export const datatest : LoginCase [] = [
  {
  username :'tomsmith',
  password :'SuperSecretPassword!',
  expectedResult :'Pass nhé',
},
{
  username :'tomsmith1',
  password :'SuperSecret',
  expectedResult :'fail nhé',
},
{
  username :'',
  password :'SuperSecret',
  expectedResult :'fail nhé',
}
];
