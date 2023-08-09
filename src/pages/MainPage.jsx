import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import ResourceNotFound from "../components/error/ResourceNotFound";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import AuthorsAvatar from "../components/mainPageComps/AuthorsAvatar";
import DesktopNavbar from "../components/navbar/DesktopNavbar";
import PostCard from "../components/post-card/PostCard";
import PostCarousel from "../components/post-carousel/PostCarousel";
import PlainPostCard from "../components/post-single/PlainPostCard";
import { RightSide } from "../components/sides/RightSide";
import {
  useGetFirstFivePostsQuery,
  useGetFourPostsForTopQuery,
  useGetMainPagePostsQuery,
  useGetThreeRandomPostsQuery,
} from "../features/posts/postSlice";
import PostsList from "../features/posts/PostsList";
import MainPageLayout from "../layouts/MainPageLayout";
import LogoCart from "../components/logo/LogoCart";
import MiniFooter from "../components/footer/MiniFooter";
import { shortestIntroText } from "../utils/shortestIntroText";
import Navbar from "../components/navbar/Navbar";
import TopOfLogoAd from "../components/advertisements/TopOfLogoAd";
import InfosCarousel from "../components/encyclopediaArticle/InfosCarousel";
import { useGetLastSevenEncyclopediaArticlesQuery } from "../features/encyclopediaArticle/encyclopediaArticleSlice";
import RewardsPano from "../components/masterpiece/RewardsPano";

const MainPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const { data, isLoading } = useGetFirstFivePostsQuery();
  const { data: fourPost, isLoading: fourLoading } =
    useGetFourPostsForTopQuery();
  const { data: mainPosts, isLoading: mainLoading } =
    useGetMainPagePostsQuery();
  const {
    data: sidePosts,
    isLoading: postsLoading,
    isError: postIsError,
    error: postError,
  } = useGetThreeRandomPostsQuery();
  const { data: sevenInfos, isLoading: ldngSvn } =
    useGetLastSevenEncyclopediaArticlesQuery();

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>Gugultaş | Anasayfa</title>
        <meta
          name="description"
          description="Eleştirilere açık , fikirleri özgün , kalemi keskin her vatandaşımızı dergimize davet ediyoruz. Hem öğretmen hem öğrenci zihniyetine sahip isen , ahlaklı ve karakter sahibi olduğunu iddia ediyor ve ufkunu genişletmek istiyor isen hemen aramıza katıl ve görüşlerini insanlarla paylaş. Gugultaş hizmetinizde..."
        />
      </Helmet>
      <DesktopNavbar />
      <Navbar />

      {matches ? (
        <>
          <MainPageLayout>
            {isLoading || fourLoading || mainLoading || ldngSvn ? (
              <MainLoadingComp
                isLoading={isLoading || fourLoading || mainLoading || ldngSvn}
              />
            ) : (
              <>
                <Grid container spacing={4}>
                  {fourPost?.map((a) => (
                    <Grid item md={3} key={a.id}>
                      <PlainPostCard post={a} />
                    </Grid>
                  ))}

                  <Grid item xs={12} md={8}>
                    <PostCarousel posts={data} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Stack spacing={2}>
                      <RewardsPano />
                      <TopOfLogoAd />
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    container
                    sx={{
                      p: 0,
                      bgcolor: "transparent",
                      borderRadius: "10px",
                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                      margin: "0 auto",
                    }}
                  >
                    <AuthorsAvatar />
                  </Grid>
                  <Grid item xs={12} md={8} sx={{ mt: 0 }}>
                    {/* <PostsList /> */}
                    <Grid
                      container
                      spacing={4}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        overflowY: "none",
                        mt: 4,
                        p: 1,
                      }}
                    >
                      <ImageList variant="masonry" cols={2} gap={8}>
                        {mainPosts?.map((post) => (
                          <ImageListItem item key={post?.id}>
                            <PostCard post={post} />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{ mt: 0, mx: { xs: 4, sm: 19, md: 0 } }}
                  >
                    <Stack spacing={2} sx={{ p: 1 }}>
                      <h4 className="list-header">Popüler Yazılar</h4>
                      {postsLoading ? (
                        <MainLoadingComp isLoading={postsLoading} />
                      ) : postIsError ? (
                        <ResourceNotFound
                          isError={postIsError}
                          error={postError}
                        />
                      ) : (
                        sidePosts &&
                        sidePosts?.map((p) => (
                          <PlainPostCard key={p?.id} post={p} />
                        ))
                      )}
                    </Stack>
                  </Grid>
                </Grid>
                {sevenInfos?.length > 0 && <InfosCarousel data={sevenInfos} />}
              </>
            )}
          </MainPageLayout>

          <MiniFooter />
        </>
      ) : (
        <>
          <Grid
            container
            spacing={5}
            sx={{ px: { xs: 1, sm: 8, md: 0 }, p: 2, bgcolor: "white" }}
          >
            <Grid item xs={12} md={8}>
              <PostCarousel posts={data} />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <LogoCart />
              <p
                style={{ textAlign: "center", marginTop: "1rem" }}
                className="paragraph--parsed p-padding-right-medium p-padding-left-medium"
              >
                {shortestIntroText}
              </p>
            </Grid>
          </Grid>
          {sevenInfos?.length > 0 && <InfosCarousel data={sevenInfos} />}
          <div className="container">
            <Stack spacing={2} sx={{ p: 1, pt: 3 }} alignItems="center">
              <PostsList propData={fourPost} />
              <PostsList propData={mainPosts} />
            </Stack>
            <RightSide />
          </div>
          <MiniFooter />
        </>
      )}
    </>
  );
};

export default MainPage;
