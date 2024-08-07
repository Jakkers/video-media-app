import Header from "@/components/Header";
import BasicCarousel from "@/components/BasicCarousel";
import ShowCase from "@/components/ShowCase";

import { DisplayGenres } from "../../components/ShowGenres";

import { Container, Heading } from "@radix-ui/themes";
import { DisplayTvGenres } from "../../components/ShowTvGenres";
import { ShowTvGenresMenu } from "../../components/TVCatergoriesMenu";

export default function TelevisonPage() {
  return (
    <>
      <DisplayTvGenres />
    </>
  );
}
