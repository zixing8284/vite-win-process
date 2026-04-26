import styled from "styled-components"

import {
  Button,
  Window,
  Tabs,
  Tab,
  Checkbox,
  WindowHeader,
  WindowContent,
  Radio,
  Slider,
  Toolbar,
  Tooltip,
  TextInput,
  MenuList,
  MenuListItem,
  Handle,
  Anchor,
  ProgressBar,
} from "react95"

const AllList = styled.div`
  display: flex;
  flex-flow: column wrap;
  scale: 0.9;
`
const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin, ante vel porttitor posuere, tellus nisi interdum ipsum, non bibendum ante risus ut purus. Curabitur vel posuere odio. Vivamus rutrum, nunc et ullamcorper sagittis, tellus ligula maximus quam, id dapibus sapien metus lobortis diam. Proin luctus, dolor in finibus feugiat, lacus enim gravida sem, quis aliquet tellus leo nec enim. Morbi varius bibendum augue quis venenatis. Curabitur ut elit augue. Pellentesque posuere enim a mattis interdum. Donec sodales convallis turpis, a vulputate elit. Suspendisse potenti.`

const AllPatterns: React.FC = () => {
  return (
    <AllList>
      <Window>
        <WindowHeader active={false}>
          <span>inactive.exe</span>
        </WindowHeader>

        <WindowContent>
          <Window
            style={{
              width: "100%",
            }}
          >
            <WindowHeader>
              <span>active.exe</span>
            </WindowHeader>
            <Toolbar>
              <Button variant="menu" size="sm">
                File
              </Button>
              <Button variant="menu" size="sm">
                Edit
              </Button>
              <Button variant="menu" size="sm" disabled>
                Save
              </Button>
            </Toolbar>
            <WindowContent>
              <div
                style={{
                  display: "flex",
                  flexFlow: "row wrap",
                  justifyContent: "space-around",
                }}
              >
                <div>
                  <div>
                    <Button>Click</Button>
                    <Button disabled>No Click</Button>
                  </div>
                  <br />
                  <Tabs>
                    <Tab>1</Tab>
                    <Tab>2</Tab>
                  </Tabs>
                  <br />
                  <Checkbox
                    value="cheese"
                    label="🧀 Extra cheese"
                    name="ingredients"
                  />
                  <br />
                  <Checkbox
                    value="cheese"
                    label="🧀 Extra cheese"
                    name="ingredients"
                    disabled
                    checked
                  />
                  <br />
                  <Checkbox
                    value="cheese"
                    label="🧀 Extra cheese"
                    name="ingredients"
                    disabled
                    checked
                    indeterminate
                  />
                  <br />
                  <Radio value="Pear" label="🍐 Pear" name="fruits" />
                  <br />
                  <Radio
                    variant="flat"
                    checked
                    value="Pear"
                    label="🍐 Pear"
                    name="fruits"
                    readOnly
                  />
                  <br />
                  <Slider defaultValue={30} />
                  <br />
                  <Tooltip text="I see you!‍" enterDelay={100} leaveDelay={500}>
                    <Button>tooltip</Button>
                  </Tooltip>
                </div>
                <div>
                  <Anchor href="#">Link</Anchor>
                  <TextInput
                    multiline
                    rows={4}
                    defaultValue={loremIpsum}
                    fullWidth
                  />
                  <br />
                  <MenuList inline>
                    <MenuListItem square disabled>
                      <span role="img" aria-label="🌿">
                        🌿
                      </span>
                    </MenuListItem>
                    <Handle size={38} />
                    <MenuListItem>Tackle</MenuListItem>
                    <MenuListItem>Growl</MenuListItem>
                    <MenuListItem disabled>Razor Leaf</MenuListItem>
                  </MenuList>
                  <br />
                  <ProgressBar value={50} />
                </div>
              </div>
            </WindowContent>
          </Window>
        </WindowContent>
      </Window>
    </AllList>
  )
}

export default AllPatterns
