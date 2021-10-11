## React clean code practices

1. JSX shorthands when passing boolean variables as props
```jsx
// bad
return (
  <Profile isAdmin={true} />
);
```
```jsx
// good
return (
  <Profile isAdmin />
)
```

2. Use ternary operator instead of if/else 
```jsx
// bad
const { role } = user;
if(role === ADMIN) {
  return <AdminUser />
} else {
  return <NormalUser />
}
```
```jsx
// good
const { role } = user;
return role = ADMIN ? <AdminUser /> : <NormalUser />
```

3. Take Advantage of Object Literals where there is multiple options
```jsx
// bad
const { role } = user;
switch(role) {
  case ADMIN:
    return <AdminUser />;
  case EMPLOYEE:
    return <EmployeeUser />;
  case USER:
    return <NormalUser />;
}
```
```jsx
// good
const { role } = user;

const component = {
  ADMIN: AdminUser,
  EMPLOYEE: EmployeeUser,
  USER: NormalUser
}

const Component = component[role];
return <Component />

```

4. User fragments(<>) over div 
```jsx
// good
return (
  <>
    <Component1 />
    <Component2 />
  </>
)
```

5. Don't Define a Function Inside Render
```jsx
// bad
import {useState} from 'react';
const [data, setData] = useState({
  name: '',
  pass: ''
})
return (
  <button onclick={() => setData({name: 'Jisan', pass:'1223'})}> 
    Submit
  </button>
) 
```
```jsx
// good
import {useState} from 'react';
const [data, setData] = useState({
  name: '',
  pass: ''
})
const handleSubmit = () => setData({name: 'Jisan', pass='1223'})
return (
  <button onclick={handleSubmit}> 
    Submit
  </button>
) 
```

6. Use memo. React.PureComponent and Memo can significantly improve the performance of your application. They help us to avoid unnecessary rendering.
```jsx
// bad
import React, {useState} from 'react';
const [userName, setUserName] = useState('Jisan')
const [count, setCount] = useState(0)

const handleIncrement = setCount(count+1)
return (
  <>
    <button onclick={handleIncrement}> 
      Increment
    </button>
    <ChildComponent userName={userName}/>
  </>
) 

const ChildrenComponent =({ userName }) => {
  console.log("rendered", userName);
  return <div> {userName} </div>;
};
```
Although child component has nothing to do with count state but it renders when you click on th button
Let's edit child component with memo. This time it will only render when necessary.
```jsx
// good
const ChildrenComponent = React.memo(({ userName }) => {
  return <div> {userName}</div>
})
```

7. Use object destructuring 
```jsx
// bad
return (
  <>
    <p> {student.name} </p>
    <p> {student.id} </p>
    <p> {student.age} </p>
  </>
)
```
```jsx
// good
const {name, id, age} = student
return (
  <>
    <p> {name} </p>
    <p> {id} </p>
    <p> {age} </p>
  </>
)
```

8. Use template literals to build large strings and avoid string concatenation for the purpose code cleanness.

```jsx
// not good
let description = user.name + "'s profession is " + user.profession
// good way
description = `${user.name}'s profession is ${user.profession}`

return <p> {description} </p>
```

9. Import In order. It improves code readability.
The role of thumb is to keep the import order like this:
- Built-in
- External
- Internal

```jsx
// example of import in order
import React from 'react';

import { PropTypes } from 'prop-types';
import styled from 'styled-components/native';

import ErrorImg from '../../assets/images/error.png';
import colors from '../../styles/colors';
```


10. Use implicit return which is a JavaScript features to write beautiful code. 
```js
// bad
const addTowNumber = (a, b) => {
  return a + b;
}

// good
const addTowNumber1 = (a, b) => a + b
```

11. Component naming. Always use PascalCase for components and camelCase for instances.

```jsx
// example
import UserCard  from './UserCard';

const userCardItem = <UserCard />
```

12. Reserved Prop Naming.
Don’t use DOM component prop names for passing props between components because others might not expect these names.

```jsx
// bad
<CustomButton style="dark" /> // or
<CustomButton className="secondary" />
```
```jsx
// good example
<CustomButton variant='fancy'/>
```


13. **Quotes**: Use double quotes for jsx attributes and single quotes for all other JS
```jsx
// example
return (
  <>
    <MyComponent title="Jisan">
    <p style={{color: 'violet', padding: '25px'}}> Hi there, </p>
  </>
)

```

14. **Prop Naming**: Always use camelCase for prop names or PascalCase if the value is a react component. 
```jsx
// example
return (
  <MyComponent
    userName="Jisan"
    phoneNumber="254544445"
    Component={ComponentName}
/>
)

```

15. **JSX in Parentheses**: 
If your component spans more than one line, always wrap it in parentheses.
```jsx
// example
return (
    <MyComponent userId="1123">
      <MyChild />
    </MyComponent>
);
```

16. **Self-Closing Tags:**
If your component doesn’t have any children, then use self-closing tags. It improves readability.

```jsx
// instead of this
<Navbar title='Jisan'></Navbar>

// follow this
<Navbar title='Jisan' />
```
17. **Alt Prop**:
Always include an alt prop in your <img > tags. And don’t use picture or image in your alt property because the screenreaders already announce img elements as images. No need to include that.

```html
<!-- bad example -->
<img src="nature.jpg" />

<img src="nature.jpg" alt="Picture of nature" />
```

```html
<!-- good -->
<img src='nature.jpg' alt="Beauty of nature" />
```# clean-code
