// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import server from '../index';

// const { expect } = chai;
// const signupUrl = 'localhost:5000/api/auth/signup';
// // const signinUrl = 'localhost:5000/api/auth/login';
// chai.use(chaiHttp);

// const regData = {
//   firstName: 'Kelvin',
//   lastName: 'Masiga',
//   email: 'kelvin@gmail.com',
//   telephone: '+256703565847',
//   fax: '',
//   company: 'PhotoCat',
//   address1: 'Wandegeya',
//   address2: '',
//   city: 'Kampala',
//   postCode: 6745,
//   country: 'Uganda',
//   state: 'central',
//   password: 'genious',
// };

// describe('User Authentication', () => {
//   describe('User signup', () => {
//     it('should register user and return the user details', ((done) => {
//       chai.request(server).post(signupUrl).send(regData).end((_err, res) => {
//         expect(res.status).to.eq(201);
//         done();
//       })
//         .catch((error) => {
//           // eslint-disable-next-line no-console
//           console.log(error);
//         });
//     }));
//   });
// });
