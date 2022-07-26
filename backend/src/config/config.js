import "dotenv/config.js";

export default {

    PORT: process.env.PORT,
    DB: process.env.DB,
    mongodb: {
        connection: "mongodb+srv://agus:agus123@cluster0.jqucz3e.mongodb.net/ecommerce?retryWrites=true&w=majority"
    },
    firebase: {
        "type": "service_account",
        "project_id": "api-rest-cfbad",
        "private_key_id": "edd56518d8577cb6977e8e7641d0f71639df3c90",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCwoZmY44pmeCt7\nl36L/5K3BnUzzvrOUYQu81mh54ebIJUlBxbuLhoIBqZmhnAQy4U4yf5gNBKQdeGI\nNTd7VCBySCDSX0MLJcLEK7/bxZoKYX2KZhtQ24ePffgP/NrY+E8KmoqG1o79AwAO\npTbNrwDFS1juPcbqiwg21EOTt9i35c0icVGH/+0tb8pACxvwWr66iOgvCJeEK6/R\nrtX9nvcTrYUtY/DMjj1j3q1vvBYYd3s4rbpQ/iVOqtxocVx15j153BA7JRHJJA3a\nRklkldSPrhw9AsLGzGvgg9TuoKNI0shDa0FbQR21x0jP9PgZ64WT8+Jz4jlQ70RV\nF5+TuwnzAgMBAAECggEADGfdPOLGZroL+8tBJR4XNOmsM65W6UTKbu3Cnt9/I8Mf\nFpGv55yvUV7+MvdASb2xprJxPlqJ70GITKPIOM5I1R4ByCTOtaq6SkL0X8A6OH5u\nbdkMFBrHI6nqUV0mFdUi4BDIp/3L3zNlvqGV/s5K1JCdN2Z5YSHQuuEfufFQtGG+\nlaLasHaCEt5r/1Fm6Q8sHXMwVJVH6xqDgUbtAyScScajF/0H4URtMXIwpx7By41A\nJgI8QQGlZuDNFsMHjqynLH0jhnjGofY5Dr3Kc8KKYFB4+KrDinBphLCeS7AcY+8H\nqVuYuZtLnkVoKNlcVI/VvJE9ic1cYO6QR+G3BCWhCQKBgQDmmkhXdjPBHrS7u/ea\nR8KTozDKSQ6LhWekBXQaJObqAIl+rTt2qkcKO03eptbyXYvHSfSHmOA5rIs+w1/D\n2xjTf02C+vW0ba+wpS8G2uPOhzhl5edjhKakhtjT+ginaxkdAdF1Q+/jD/gp1XJn\nbI5rlFEJq4E1+IVDGtyrb0RQtwKBgQDEFZ9db//57TjsRV/3NHa7xOeP+q/+g8Zn\nWmpTLHEd56c7BdoQ5FxO6vpAAGCAF0vS5WoKxgbC8uwPyv4AZoMCIs4s8hVi4Lfh\ndsgbk3v1FAlNDTVHDd8Jo4SvZ86mYconXo/y2BS03CT3z4utGequ3CeKXKgUg6+8\nPS2cjhkcpQKBgHOtEvrkrWODrq+5w6PduWpr4y6l5Sjx26J4pdvzhO3/JPmplnmZ\nQxeL1i0JTiu350UqAQMAGgJ0Xkk2olRSFKsLYeuBTj2bBBW9VtC+fqX8SLs8z4yp\nXxqLFjuHYk3xOGDHp7WGRdCGEzuQ+dmNqAepF9mc8a0MJHUcBXPt1bwTAoGAfRH1\nppmrwnSHXF0bywgRu87qjLGv1D2lLYNEUm0EcbiyuDkRULj4D/ZdTLlw1AMIACsI\nqnqJEYv0+lXWEddRNOmSbKS08262mv8ywDQgWsA+9oC4POwiGXnNRjyGWSYC1X3B\nf3pIKtxIUDB3vR/My1/tcJmNNBiS3RSApV0Vs2kCgYBV/08TmWkkMJepRYijGkWH\n6MLdjPwUNwd7N4ER39Dv52WOlYfrZB9dbrPX5P8kLXaw3W5oKNg+a8nnXnNxezM2\naV6AtTo2OnMj3S6uE2jMbNG4P6ft736+ACG48TCQct0wfHHiO+KIfgb5KFbZJ2e8\nFWg2hdTVEqhehK7IDAHK/A==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-2ggd8@api-rest-cfbad.iam.gserviceaccount.com",
        "client_id": "111767899837970869873",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2ggd8%40api-rest-cfbad.iam.gserviceaccount.com"
    }
}