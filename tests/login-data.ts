export type LoginCase = {
  username :string;
  password :string;
  expectedResult :string;
} 
export const datatest : LoginCase [] = [
  {
  username :'tomsmith',
  password :'SuperSecret',
  expectedResult :'Pass nhé',
},
{
  username :'tomsmith1',
  password :'SuperSecret',
  expectedResult :'fail nhé',
},
{
  username :'tomsmith',
  password :'SuperSecret',
  expectedResult :'fail nhé',
}
];
