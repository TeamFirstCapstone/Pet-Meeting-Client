import {user} from "../../service";
const { login, login_status } = require("../user");
const { get, list, create } = require('../entrust');

export function fakeFetch(fakeJson) {
    return jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
            ok: true,
            json: () => fakeJson,
        });
      });
    });
  }

// console.log(fakeFetch);
// describe('test for entrust', () => {
//     // beforeAll(async () => {
//     //     await user.login("Sony", "Sung").then((result) =>
//     //           expect(result).toEqual(login_status.success));
            
//     //     })
//     global.fetch = fakeFetch({
//         status: false,
//         message: "login_fail",
//       });
//     beforeAll(async () => {
       
//         await user.login("Sony","Sung");
//     })
   
//     //   return login("Sony", "Sung").then((result) =>
//     //     expect(result).toEqual(login_status.success)
//     //   );
//     it('get entrust by id', async () => {
//         const res = await get(1);
//         expect(res.startDate).toBe('2020-10-12'.toISOString); 
//     });

   
// })

describe('test creating entrust',() => {
    it('create entrust', async () => {
        //db참고할 때 
        const payload = {
            text: 'JaeHyun Entrusting',
            startDate: new Date('2020-10-02').toISOString(),
            endDate: new Date('2020-10-10').toISOString(),
            toyPayment:3,
            cityId:1,
            housings:['villa'],
            pets:['sichu']
            
        };
        global.fetch = fakeFetch({ result: payload });
        const res = await create(payload);
        expect(res.text).toBe('JaeHyun Entrusting')
                
    });
})