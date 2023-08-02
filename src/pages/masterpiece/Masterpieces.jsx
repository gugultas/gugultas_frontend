import React from "react";
import { Stack } from "@mui/material";

import ProfileLayout from "../../layouts/ProfileLayout";
import {
  useGetTopMovieOfTheWeekQuery,
  useGetTopMusicOfTheWeekQuery,
  useGetTopPictureOfTheWeekQuery,
} from "../../features/masterpiece/masterpieceSlice";
import AccordionSingleMasterpieceComp from "../../components/masterpiece/AccordionSingleMasterpieceComp";
import MainLoadingComp from "../../components/loading/MainLoadingComp";
import AccessOfMasterpieceHistoryLinksComp from "../../components/masterpiece/AccessOfMasterpieceHistoryLinksComp";

const Masterpieces = () => {
  const { data: music, isLoading: isMscLdng } = useGetTopMusicOfTheWeekQuery();
  const { data: picture, isLoading: isPctrLdng } =
    useGetTopPictureOfTheWeekQuery();
  const { data: movie, isLoading: isMvLdng } = useGetTopMovieOfTheWeekQuery();
  return (
    <ProfileLayout>
      <h3 className="heading-secondary u-margin-bottom-medium">
        Haftanın Eserleri
      </h3>
      <p className="paragraph--parsed">
        Gugultaş olarak , yazarlarımızla beraber belli başlı konularda haftanın
        enlerini seçiyoruz. Bu konu başlıkları dergiye bağlı bazı durumlara göre
        artabilir veya azalabilir. Herhangi bir konuda haftanın enine ,
        dergimizde o konu başlığı altında yazan yazarlarımız karar verecek. Eğer
        o konu alanında yazan bir yazarımız dahi yoksa jüriler derginin
        yöneticileri olacaktır ve yazar bulunana kadar belli bir süre haftanın
        enlerini amatör olarak yönetici kadrosu seçecektir. Bu süre uzarsa , o
        konu başlığı için ödül sekmesi dondurulacaktır ancak umarız böyle bir
        durumla karşılaşmayız.
      </p>
      <p className="paragraph--parsed">
        Derginin yöneticileri olarak , haftanın enlerini seçme sürecinde
        yazarlarımızdan tek bir ricamız olacaktır. Karar verme sürecinde ,
        alanında amatör ama işine tutkulu ve ülkemizde yaşayan bireylerin
        eserlerine normalinden biraz daha fazla odaklanmaları , hem o birey
        adına hem bireyin ilgi alanı adına hem de ülkemiz adına çok fazla
        yararlı olacağını düşünüyoruz. Bu bir naçizane öneridir , tabii ki
        yazarlarımız eser seçme konusunda sınırsız bir şekilde özgürlerdir.
      </p>
      <p className="paragraph--parsed">
        Çiçeği burnunda bir dergi olduğumuz ve olabildiğince birçok eseri
        takipçilerimize tanıtmak istediğimizden belli bir süre , bu ödül
        uygulamasını haftalık olarak devam ettireceğiz. İleride bu etkinliği
        aylık olarak düzenleyeceğiz. Yıllık ödüllendirmelerimiz ise her daim
        Aralık ayında gerçekleşecektir.
      </p>
      <p className="paragraph--parsed u-margin-bottom-big">
        Hemen altta haftanın eserlerine ulaşabilirsiniz. En altta yer alan
        listede ise herhangi bir alan ile ilgili tüm ödül alanlara
        ulaşabileceğiniz linkler yer almaktadır.
      </p>

      {(isMscLdng || isPctrLdng || isMvLdng) && (
        <MainLoadingComp isLoading={isMscLdng || isPctrLdng || isMvLdng} />
      )}
      <Stack spacing={3}>
        <AccordionSingleMasterpieceComp
          data={music}
          genre="music"
          bgColor="#dd159e7b"
        />
        <AccordionSingleMasterpieceComp
          data={picture}
          genre="picture"
          bgColor="#bbb42a7a"
        />
        <AccordionSingleMasterpieceComp
          data={movie}
          genre="movie"
          bgColor="#1a87b979"
        />
        <AccessOfMasterpieceHistoryLinksComp />
      </Stack>
    </ProfileLayout>
  );
};

export default Masterpieces;
