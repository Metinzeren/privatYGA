import axios from "axios";

export default async function handler(req, res) {
  let { locale } = req.query;

  try {
    const { data } = await axios.get(
      `https://yga.org.tr/cms/api/v1/${locale}/language-translations`
    );

    return res.status(200).json(data.message);
  } catch (error) {
    if (error.message) {
      return res.status(400).json({ error: error.message });
    } else {
      return res
        .status(400)
        .json({ error: "Something went wrong, please try again." });
    }
  }
}
//hayır kanka json dosyası nerde sen burda datayı alıp json olarak döndürüoyrsun bak şimdi
// console bak dosyayı bulamıyor sonra apiden yanıt gelince buluyor bunun sonucu nereye dönyüor ? tam bilmiyorum kanka bunla alakalaı sayfaları göstereyim zaten 2 3 tane yok gerek yok
//su menuyu diger tarafa al
