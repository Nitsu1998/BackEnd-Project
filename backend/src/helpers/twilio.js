import twilio from 'twilio'
import config from '../config/config.js'

function newWhatsappMessage(text) {
    const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN)
    const options = {
        body: text,
        to: 'whatsapp:+5492215360884',
        from: 'whatsapp:+14155238886'
    }
    try{
        client.messages.create(options)
    }catch(err){
        console.log(err)
    }
}
export default newWhatsappMessage