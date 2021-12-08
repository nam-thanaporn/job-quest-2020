# Part B2: Architecture Design Task

## Folder Structure

```bash
├── src
│   ├── assets #eg. images, icons, fonts etc.
│   ├── components #common components
│   │   ├── Form
│   │   │   ├── Contract
│   │   │   │   │   ├── Contract001
│   │   │   │   │   │   ├── index.jsx
│   │   │   │   │   │   ├── index.less
│   │   │   ├── PersonalInformation
│   │   │   │   │   ├── PersonalInformation001
│   │   │   │   │   │   ├── index.jsx
│   │   │   │   │   │   ├── index.less
│   ├── pages
│   │   ├── Marathon
│   │   │   ├── _redux
│   │   │   │   ├── PersonalInformation #Step1
│   │   │   │   │   ├── actions.js #จัดการ action ที่ call srivce แล้วส่งค่าให้ slice จัดการ
│   │   │   │   │   ├── crud.js #sercive
│   │   │   │   │   ├── slice.js # จัดการ state 
│   │   │   │   ├── ApplicantBackground #Step2
│   │   │   │   │   ├── actions.js
│   │   │   │   │   ├── crud.js
│   │   │   │   │   ├── slice.js
│   │   │   │   ├── ...
│   │   │   ├── components #components in Marathon
│   │   │   │   ├── PersonalInformation #Step1
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   ├── index.less
│   │   │   │   ├── ApplicantBackground #Step2
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   ├── index.less
│   │   │   │   ├── EmergencyContact #Step3
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   ├── index.less
│   │   │   │   ├── MedicalInformation #Step4
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   ├── index.less
│   │   │   │   ├── Souvenir  #Step4
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   ├── index.less
│   │   │   │   ├── ConfirmInformation #Step6
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   ├── index.less
│   │   │   ├── index.jsx
│   │   │   ├── index.less # Marathon page style
│   ├── layouts # General layout eg. header,foorter etc.
│   ├── constants # eg. url constants (No logic)
│   ├── utils # function common (logic)
│   ├── global.less # global style
```

## Library

- **Ant Design**
  - ใช้งานง่าย config ได้หลากหลายรูปแบบ
  - document อ่านเข้าใจง่าย
  - มีตัวอย่างที่หลากหลาย ทำให้สามารถนำไปเป็น idea ในการ design UX/UI
- **prop-types** : เช็ค type ของ props ที่จะรับเข้ามาใน component
- **@reduxjs/toolkit** : จัดการ state ทดแทนปัญหาการใช้งาน Redux ที่ยุ่งยาก

## จะต้องจัดการ State ของข้อมูลอย่างไร เพื่อรองรับกับโจทย์นี้ได้

ใช้ @reduxjs/toolkit เพราะสามารถใช้ค่า state โดยไม่ต้องผ่าน props เพื่อรองรับ components ที่มีความซับซ้อน

## จะใช้วิธีใดในการ Validate Form สำหรับการ Save Draft และสำหรับการ Submit

เราจะใช้ Component Form ของ antd เพื่อมาช่วยในการ validate เพราะเพียงแค่ config rules ตามที่เราต้องการเข้าไป ก็จะทำการจัดการในการ validate ให้เลย

- **Save Draft** : จะ valid input type เท่านั้น เช่น เบอร์โทรศัพท์ ต้องเป็นตัวเลขเท่านั้น

- **Submit** : ต้อง valid input type และ valid required field

โดยจะเก็บ required เป็น state

- เมื่อคลิก button **Save Draft**
  1. set `required = false` เพื่อไม่ต้องตรวจสอบว่ากรอกข้อมูลครบถ้วน
  2. ตรวจสอบ field ว่ากรอกข้อมูลถูกต้องตาม pattern หรือไม่ เช่น เบอร์โทรศัพท์ ต้องเป็นตัวเลขเท่านั้น
  3. ส่งข้อมูลไปยังหลังบ้าน
- เมื่อคลิก button **Submit** 1. set `required = true` ตรวจสอบว่ากรอกข้อมูลครบถ้วน 2. ตรวจสอบ field ว่ากรอกข้อมูลถูกต้องตาม pattern หรือไม่ เช่น เบอร์โทรศัพท์ ต้องเป็นตัวเลขเท่านั้น 3. ส่งข้อมูลไปยังหลังบ้าน

[code example]: https://codesandbox.io/s/save-draft-and-submit-nqxn6?file=/index.js
