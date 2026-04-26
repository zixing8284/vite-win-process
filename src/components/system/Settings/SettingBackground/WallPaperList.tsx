import { Listul, ListulItem } from "@/components/system/Window/CommonStyle"
import type { Wallpaper } from "@/contexts/system/types"

type WallPaperListProps = {
  wallpaperOptions: Wallpaper[]
  backgroundImage: string | undefined
  onChange: (wallpaper: Wallpaper) => void
  style: React.CSSProperties
}

const WallPaperList: React.FC<WallPaperListProps> = ({
  wallpaperOptions,
  backgroundImage,
  onChange,
  style,
}) => {
  return (
    <Listul style={style}>
      {wallpaperOptions.map((wallpaper) => (
        <ListulItem
          key={wallpaper.value}
          active={backgroundImage === wallpaper.value}
          onClick={() => onChange(wallpaper)}
        >
          {wallpaper.label}
        </ListulItem>
      ))}
    </Listul>
  )
}

export default WallPaperList
