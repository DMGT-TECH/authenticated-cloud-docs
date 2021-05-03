import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



<Tabs
  groupId="operating-systems"
  defaultValue="win"
  values={[
    {label: 'Windows', value: 'win'},
    {label: 'macOS', value: 'mac'},
  ]
}>
<TabItem value="win">Use Ctrl + C to copy.</TabItem>
<TabItem value="mac">Use Command + C to copy.</TabItem>
</Tabs>

<Tabs
  groupId="operating-systems"
  defaultValue="win"
  values={[
    {label: 'Windows', value: 'win'},
    {label: 'macOS', value: 'mac'},
  ]
}>
<TabItem value="win">Use Ctrl + V to paste.</TabItem>
<TabItem value="mac">Use Command + V to paste.</TabItem>
</Tabs>
Copy

These are details

```jsx title="/src/components/HelloCodeTitle.js"
function HelloCodeTitle(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
Copy

```jsx
def __init__(self):
    print("We are initialized")
    pass
```
