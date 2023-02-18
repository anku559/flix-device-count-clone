import { UserData } from '../interface/User';
import { ResponseObject } from '../interface/ResponseObject';
import User from '../schema/User';
import sendEmail from '../helpers/third-party/mailer';
import { createHash, checkHash } from '../helpers/third-party/encryption';
import { numberInRange } from '../helpers/custom';
import { signJwt } from '../helpers/third-party/authentication';
import Device from '../schema/Devices';

const PLANS_STATIC = [
  {
    id: '4b0be084-3b46-4518-9ecf-2079ceab067d',
    plan_name: 'Basic',
    plan_devices_count: 10,
  },

  {
    id: '24145dea-dc68-4996-a429-3816d997535f',
    plan_name: 'Silver',
    plan_devices_count: 4,
  },

  {
    id: 'e6b383c8-ed0b-41b6-b48f-bacad583adde',
    plan_name: 'Gold',
    plan_devices_count: 10,
  },

  {
    id: 'a2a9664c-0132-442e-8aa6-b24afd12c096',
    plan_name: 'Platinum',
    plan_devices_count: 'UNLIMITED',
  },
];

export default class UserModel {
  static async registerUser(postData: UserData) {
    let response: ResponseObject;

    try {
      const trimEmail = postData.email.trim();
      const lowerCaseEmail = trimEmail.toLowerCase();

      const findUser = await User.findOne({ where: { email: lowerCaseEmail } });

      if (findUser) {
        response = {
          code: 409,
          status: false,
          info: 'Conflict',
          message: 'Duplicate user found.',
        };
      } else {
        const oneTimePass = numberInRange(111111, 999999);
        const { hash, salt } = createHash(String(oneTimePass));

        sendEmail(
          postData.email,
          'OTP',
          `<h1>OTP</h1> <br/> <p> Your Email: ${postData.email}</p> <p> Your OTP: ${oneTimePass}</p>`,
        );

        await User.create({
          ...postData,
          plan_id: PLANS_STATIC[0].id,
          password_hash: hash,
          password_salt: salt,
        });

        response = {
          code: 201,
          status: true,
          info: 'Created',
          message: 'Email registered successfully.',
        };
      }
    } catch (error: any) {
      response = {
        code: 500,
        status: false,
        info: 'Internal Server Error',
        message: error.message,
      };
    }
    return response;
  }

  static async loginUser(postData: UserData) {
    let response: ResponseObject;

    try {
      const findUser: any = await User.findOne({
        where: { email: postData.email },
        raw: true,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });

      if (findUser) {
        const isValid: boolean = checkHash(
          postData.password,
          findUser.password_hash,
        );

        if (!isValid) {
          response = {
            code: 403,
            status: false,
            info: 'Unauthorized',
            message: 'Provided password is invalid.',
          };
        } else {
          let isValidCount;

          for await (const [idx, plan] of PLANS_STATIC.entries()) {
            if (plan.id === findUser.plan_id) {
              const countLogin = await Device.count({
                where: { user_id: findUser.id },
              });

              if (countLogin < plan.plan_devices_count) {
                await Device.create({
                  user_id: findUser.id,
                  device_name: 'New Device',
                });
                isValidCount = true;
              } else {
                isValidCount = false;
              }
            }
          }

          console.log(isValidCount);

          if (isValidCount) {
            const outputData = { ...findUser };
            delete outputData.password_hash;
            delete outputData.password_salt;

            const jsonPayLoad = { ...outputData };

            const tokenData = await signJwt(jsonPayLoad);

            response = {
              code: 200,
              status: true,
              info: 'OK',
              message: 'User logged in successfully.',
              data: tokenData,
            };
          } else {
            response = {
              code: 403,
              status: false,
              info: 'Forbidden',
              message: 'Device count reached maximum.',
            };
          }
        }
      } else {
        response = {
          code: 404,
          status: false,
          info: 'Not Found',
          message: 'User not found.',
        };
      }
    } catch (error: any) {
      response = {
        code: 500,
        status: false,
        info: 'Internal Server Error',
        message: error.message,
      };
    }
    return response;
  }

  static async updateUser(postData: any) {
    let response;
    try {
      await User.update(
        { plan_id: postData.id },
        { where: { id: postData.id } },
      );

      let mailText: string = '';

      PLANS_STATIC.forEach((plan) => {
        if (plan.id === postData.id) {
          mailText = `        
        <!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>

    <body>
        <div
            style="width:600px; margin:0 auto; padding: 15px; border:1px solid #ddd ;@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600;700;800&display=swap');font-family: 'Open Sans', sans-serif;">
            <h1 style="font-weight: bold ;">Grazie per aver attivato L'abbonamento a NetFlixDemo
            </h1>

            <p>Ciao pasquale,</p>
            <p>puoi cominciare a guardare serie TV e flim</p>
            <div>
                <button type='submit'
                    style="width: 100%; padding: 15px;font-size:1rem; background-color: #0267FF; color: #fff; font-weight: bold; border-width: 0px; border-radius: 5px;">Comincia
                    a
                    guardian</button>
            </div>
            <div
                style="padding: 15px; border-radius: 10px; border:2px solid #b3b3b3; color: #575757; margin-top: 20px;">
                <h3>Information relative al tua accout</h3>
                <p style="font-size: .85rem; line-height: 1.4rem;">
                    <b>Email</b><br />
                    ${postData.email}
                </p>
                <hr />
                <p style="font-size: .85rem; line-height: 1.4rem;">
                    <b>Provider di servizi</b><br />
                    Netflix Services Italy S.R.L
                </p>
                <hr />
                <p style="font-size: .85rem; line-height: 1.4rem;">
                    <b>Piano</b><br />
                    ${plan.plan_name}
                </p>
                <hr />
                <p style="font-size: .85rem; line-height: 1.4rem;">
                    <b>Prezzo del piano</b><br />
                    12.99 $/mese
                </p>
                <hr />
                <p style="font-size: .85rem; line-height: 1.4rem;">
                    <b>Pagamento</b><br />
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png'
                        height='25' /> *** *** *** 0680
                </p>
            </div>
            <p style="color: #575757; text-align:center;">Siamo qui per aiutarti se hai bisogono. Per maggiori
                informazzioni visita il <a href='#'>Centro
                    assistenza</a> o <a href='#'>conttattaci</a>
            </p>
            <p style="color: #575757; text-align:center;">II team NetflixDemo</p>
        </div>
    </body>

</html>`;
        }
      });

      await sendEmail(postData.email, 'Plan Changed', mailText);

      response = {
        code: 200,
        status: true,
        info: 'OK',
        message: 'User plan updated successfully.',
      };
    } catch (error: any) {
      response = {
        code: 500,
        status: false,
        info: 'Internal Server Error',
        message: error.message,
      };
    }
    return response;
  }
}

// Degree	College/Univ	Year	Percentage
