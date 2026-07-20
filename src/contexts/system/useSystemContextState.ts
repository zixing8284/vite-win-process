import { useCallback, useMemo, useState } from "react"

import useLocalStorage from "@/hooks/useLocalStorage"
import type { SystemValue, SystemContextType, Wallpaper } from "./types"
import themes from "@/contexts/system/themes/themes"

import Autumn from "@/assets/backgrounds/Autumn.jpg"
import Ascent from "@/assets/backgrounds/Ascent.jpg"
import Azul from "@/assets/backgrounds/Azul.jpg"
import Bliss from "@/assets/backgrounds/Bliss.jpg"
import BlueLace16 from "@/assets/backgrounds/BlueLace16.bmp"
import bluescreen from "@/assets/backgrounds/bluescreen.png"
import boxes from "@/assets/backgrounds/boxes.png"
import CoffeeBean from "@/assets/backgrounds/CoffeeBean.bmp"
import Crystal from "@/assets/backgrounds/Crystal.jpg"
import egypt from "@/assets/backgrounds/egypt.png"
import Energy_bliss from "@/assets/backgrounds/Energy_bliss.jpg"
import FeatherTexture from "@/assets/backgrounds/FeatherTexture.bmp"
import Follow from "@/assets/backgrounds/Follow.jpg"
import Friend from "@/assets/backgrounds/Friend.jpg"
import GoneFishing from "@/assets/backgrounds/GoneFishing.bmp"
import Greenstone from "@/assets/backgrounds/Greenstone.bmp"
import Home from "@/assets/backgrounds/Home.jpg"
import Honey from "@/assets/backgrounds/honey.png"
import Leaves from "@/assets/backgrounds/leaves.png"
import Moon_flower from "@/assets/backgrounds/Moon_flower.jpg"
import Noise from "@/assets/backgrounds/noise.gif"
import Peace from "@/assets/backgrounds/Peace.jpg"
import Power from "@/assets/backgrounds/Power.jpg"
import PrairieWind from "@/assets/backgrounds/PrairieWind.bmp"
import PurpleSquares from "@/assets/backgrounds/purpleSquares.png"
import Radiance from "@/assets/backgrounds/Radiance.jpg"
import Red_moon_desert from "@/assets/backgrounds/Red_moon_desert.jpg"
import Rhododendron from "@/assets/backgrounds/Rhododendron.bmp"
import Ripple from "@/assets/backgrounds/Ripple.jpg"
import RiverSumida from "@/assets/backgrounds/RiverSumida.bmp"
import Rivets from "@/assets/backgrounds/rivets.png"
import SantaFeStucco from "@/assets/backgrounds/SantaFeStucco.bmp"
import SoapBubbles from "@/assets/backgrounds/SoapBubbles.bmp"
import Stonehenge from "@/assets/backgrounds/Stonehenge.jpg"
import Tulips from "@/assets/backgrounds/Tulips.jpg"
import Vortec_space from "@/assets/backgrounds/Vortec_space.jpg"
import Water from "@/assets/backgrounds/water.gif"
import Wind from "@/assets/backgrounds/Wind.jpg"
import Windows_XP_Professional from "@/assets/backgrounds/Windows_XP_Professional.jpg"
import Zapotec from "@/assets/backgrounds/Zapotec.bmp"
import Zigzag from "@/assets/backgrounds/zigzag.png"

const wallpapers: Wallpaper[] = [
  { value: "", label: "None" },
  {
    label: "Windows XP Professional",
    value: `url(${Windows_XP_Professional})`,
  },
  { value: `url(${Ascent})`, label: "Ascent" },
  { value: `url(${Autumn})`, label: "Autumn" },
  { value: `url(${Azul})`, label: "Azul" },
  { value: `url(${Bliss})`, label: "Bliss" },
  { value: `url(${BlueLace16})`, label: "Blue Lace 16" },
  { value: `url(${bluescreen})`, label: "Blue screen" },
  { value: `url(${boxes})`, label: "Boxes" },
  { value: `url(${CoffeeBean})`, label: "Coffee Bean" },
  { value: `url(${Crystal})`, label: "Crystal" },
  { value: `url(${egypt})`, label: "Egypt" },
  { value: `url(${Energy_bliss})`, label: "Energy bliss" },
  { value: `url(${FeatherTexture})`, label: "Feather Texture" },
  { value: `url(${Follow})`, label: "Follow" },
  { value: `url(${Friend})`, label: "Friend" },
  { value: `url(${GoneFishing})`, label: "Gone Fishing" },
  { value: `url(${Greenstone})`, label: "Greenstone" },
  { value: `url(${Home})`, label: "Home" },
  { value: `url(${Honey})`, label: "Honey" },
  { value: `url(${Leaves})`, label: "Leaves" },
  { value: `url(${Moon_flower})`, label: "Moon flower" },
  { value: `url(${Noise})`, label: "Noise" },
  { value: `url(${Peace})`, label: "Peace" },
  { value: `url(${Power})`, label: "Power" },
  { value: `url(${PrairieWind})`, label: "Prairie Wind" },
  { value: `url(${PurpleSquares})`, label: "Purple squares" },
  { value: `url(${Radiance})`, label: "Radiance" },
  { value: `url(${Red_moon_desert})`, label: "Red moon desert" },
  { value: `url(${Rhododendron})`, label: "Rhododendron" },
  { value: `url(${Ripple})`, label: "Ripple" },
  { value: `url(${RiverSumida})`, label: "River Sumida" },
  { value: `url(${Rivets})`, label: "Rivets" },
  { value: `url(${SantaFeStucco})`, label: "Santa Fe Stucco" },
  { value: `url(${SoapBubbles})`, label: "Soap Bubbles" },
  { value: `url(${Stonehenge})`, label: "Stonehenge" },
  { value: `url(${Tulips})`, label: "Tulips" },
  { value: `url(${Vortec_space})`, label: "Vortec space" },
  { value: `url(${Water})`, label: "Water" },
  { value: `url(${Wind})`, label: "Wind" },
  { value: `url(${Zapotec})`, label: "Zapotec" },
  { value: `url(${Zigzag})`, label: "Zig-zag" },
]

export const defaultSystemContextValue: SystemValue = {
  theme: themes["original"],
  vintageFont: true,
  fontSizeMagnification: 0.75, // default 16px * 0.75 = 12px
  scanLines: false,
  scanLinesIntensity: 100,
  backgroundColor: "#008080",
  backgroundImage: "",
  backgroundRepeat: "no-repeat",
  backgroundSize: "auto auto",
  backgroundPosition: "center",
  taskbarPosition: "bottom",
  autoHideTaskbar: false,
  wallpapers,
}

export const SYSTEM_STORAGE_KEY = "system"

const useSystemContextState = () => {
  const [storedSystemValue, setSystemLocalStorage] =
    useLocalStorage<SystemValue>(SYSTEM_STORAGE_KEY, defaultSystemContextValue)

  const [tempSystemValue, setTempSystemValue] =
    useState<SystemValue>(storedSystemValue)

  const updateSystemValue = useCallback(
    (key: keyof SystemValue, value: SystemValue[keyof SystemValue]) => {
      const newSystemValue = { ...tempSystemValue, [key]: value }
      setTempSystemValue(newSystemValue)
    },
    [tempSystemValue],
  )

  const saveSystemLocalStorage = useCallback(
    (newSystemValue: SystemValue) => {
      setSystemLocalStorage(newSystemValue)
    },
    [setSystemLocalStorage],
  )

  return useMemo(
    () => ({
      systemValue: tempSystemValue,
      storedSystemValue,
      updateSystemValue,
      saveSystemLocalStorage,
    }),
    [
      tempSystemValue,
      storedSystemValue,
      updateSystemValue,
      saveSystemLocalStorage,
    ],
  ) as SystemContextType
}

export default useSystemContextState
