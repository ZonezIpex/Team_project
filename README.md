
## 추가-4<br/>
src/components에 review 폴더 추가<br/>
ReviewCard.jsx<br/>
ReviewTabs.jsx<br/>
ReviewSlider.jsx<br/>
ReviewGrid.jsx<br/>
reviewStyles.jsx<br/>
까지가 ReviewList.jsx 에 들어가야 하는 코드<br/><br/>

ReviewForm.jsx<br/>
ReviewImageUpload.jsx<br/>
ReviewRating.jsx<br/>
reviewWriteStyles.jsx<br/>
까지가 ReviewWrite.jsx에 들어가야 하는 코드<br/><br/>

## App.js<br/>
<Route path="/review" element={<ReviewList />} /><br/>
<Route path="/review/write" element={<ReviewWrite />} /><br/>
해당 코드 추가<br/><br/>

## MenuSidebar.jsx<br/>
<MenuButton onClick={() => (window.location.href = '/reviews')}>{text.review}</MenuButton> 에서<br/>
reviews => review 로 변경<br/>
<MenuButton onClick={() => (window.location.href = '/review')}>{text.review}</MenuButton><br/><br/>

## scr/pages<br/>
ReviewList.jsx<br/>
ReviewWrite.jsx<br/>
추가<br/><br/>

## scr/assets<br/>
resume-1.jpg<br/>
이미지 추가<br/><br/>

## 터미널<br/>
npm install react-icons<br/>
해당 패키지는 별점 때문에 설치하는 것<br/>
ㄴ만약 안되면 PowerShell을 관리자 권한으로 열고  Set-ExecutionPolicy RemoteSigned 입력 후 y 입력