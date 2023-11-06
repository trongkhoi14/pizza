const asyncHandler = require('express-async-handler')
const transporter = require('./emailTransporter')

const passwordReset = asyncHandler(async ({email, html}) => {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Kin Pizza" <no-reply@kinpizza.com>', // sender address
    to: email, // list of receivers
    subject: "Password Reset", // Subject line
    text: "Click the link to reset your password.", // plain text body
    html: html, // html body
  });

  return info;
})

const alarmOrder = asyncHandler(async ({emailAdmin, emailCustomer, deliveryTime, order}) => {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Kin Pizza" <no-reply@kinpizza.com>', // sender address
    to: [emailAdmin, emailCustomer], // list of receivers
    subject: `New Order - ${order.orderId}`, // Subject line
    //text: "Click the link to reset your password.", // plain text body
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <title>New Order Notification</title>
      </head>
      <body>
        <h1>New Order Received!</h1>
        <p>Thank you for your purchase. You can follow this <a href="https://kinpizza.com/tracking">link</a> to view the status of your order.</p>
        <hr />
        <h2>Order Information:</h2>
        <table style="border-collapse:collapse;border: 1px solid black;">
          <tr style="border: 1px solid black;">
            <td style="border: 1px solid black;">Order ID</td>
            <td style="border: 1px solid black;">${order.orderId}</td>
          </tr>
          <tr style="border: 1px solid black;">
            <td style="border: 1px solid black;">Customer Name</td>
            <td style="border: 1px solid black;">${order.name}</td>
          </tr>
          <tr style="border: 1px solid black;">
            <td style="border: 1px solid black;">Customer Mobile</td>
            <td style="border: 1px solid black;">${order.mobile}</td>
          </tr>
          <tr style="border: 1px solid black;">
            <td style="border: 1px solid black;">Delivery Address</td>
            <td style="border: 1px solid black;">${order.address}</td>
          </tr>
          <tr style="border: 1px solid black;">
            <td style="border: 1px solid black;">Delivery Method</td>
            <td style="text-transform:uppercase;border: 1px solid black;">${order.method.name}</td>
          </tr>
          <tr style="border: 1px solid black;">
            <td style="border: 1px solid black;">Order Time</td>
            <td style="border: 1px solid black;">${deliveryTime}</td>
          </tr>
          <tr>
            <td style="border: 1px solid black;">Estimated Delivery Time&nbsp;&nbsp;&nbsp;</td>
            <td style="border: 1px solid black;">${order.method.hour}</td>
          </tr>
          <tr style="border: 1px solid black;">
            <td style="border: 1px solid black;">Number of Products</td>
            <td style="border: 1px solid black;">${order.totalProduct}</td>
          </tr>
          <tr style="border: 1px solid black;">
            <td style="border: 1px solid black;">Total Price</td>
            <td style="border: 1px solid black;">${order.totalPrice} VND</td>
          </tr>
        </table>
        <hr />
        <div>
          <h4>Kin Pizza - Love with New York's style</h4>
          <h4>Contact number: 0386016399</h4>
          <h4>Website: https://kinpizza.com</h4>
          <h4>216/5 Nguyen Van Huong, Thao Dien Ward, Thu Duc City, Ho Chi Minh City</h4>
        </div>
      </body>
    </html>
    `, // html body
  });

  return info;
})

module.exports = {
  passwordReset,
  alarmOrder
}