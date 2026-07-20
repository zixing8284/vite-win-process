import { Button, Toolbar } from "react95"

const headerToolbarStyle = {
  padding: 0,
}

const VideoPlayerMenu = () => {
  return (
    <Toolbar style={{ ...headerToolbarStyle, position: "relative" }}>
      {["File", "Edit", "Device", "Scale", "Help"].map((menuHeader) => (
        <Button
          key={menuHeader}
          style={{ fontSize: 13, height: "1.6em" }}
          size="sm"
          variant="thin"
          disabled
        >
          <span style={{ textDecoration: "underline" }}>{menuHeader[0]}</span>
          {menuHeader.slice(1)}
        </Button>
      ))}
    </Toolbar>
  )
}

export default VideoPlayerMenu
