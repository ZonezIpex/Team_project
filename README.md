##App.js
<Route path="/review" element={<ReviewList />} />
<Route path="/review/write" element={<ReviewWrite />} />
해당 코드 추가

##MenuSidebar.jsx
<MenuButton onClick={() => (window.location.href = '/reviews')}>{text.review}</MenuButton> 에서
reviews => review 로 변경
<MenuButton onClick={() => (window.location.href = '/review')}>{text.review}</MenuButton>

##scr/pages
ReviewList.jsx
ReviewWrite.jsx
추가

##scr/assets
resume-1.jpg
이미지 추가

##터미널
npm install react-icons
해당 패키지는 별점 때문에 설치하는 것
ㄴ만약 안되면 PowerShell을 관리자 권한으로 열고  Set-ExecutionPolicy RemoteSigned 입력 후 y 입력