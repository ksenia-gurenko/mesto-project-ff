(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-24",headers:{authorization:"42990d20-5bf4-4516-a1c3-36f0363231d2","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=document.querySelector("#card-template").content;function o(e,t,o,r,c){var a=n.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__delete-button"),u=a.querySelector(".card__like-button"),l=a.querySelector(".card__image"),s=a.querySelector(".card__title"),d=a.querySelector(".card__likes-counter");return d.textContent=e.likes.length,e.likes.some((function(e){return e._id===t}))&&u.classList.add("card__like-button_is-active"),l.src=e.link,l.alt=e.name,s.textContent=e.name,t!==e.owner._id?i.remove():i.addEventListener("click",(function(t){var n=e._id;o(t,n)})),u.addEventListener("click",(function(t){r(d,t,e)})),l.addEventListener("click",(function(e){c({link:l.src,name:l.alt,title:s.textContent})})),a}function r(n,o){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)})(o).then((function(){n.target.closest(".card").remove()})).catch((function(e){console.log(e)}))}function c(n,o,r){var c;o.target.classList.contains("card__like-button_is-active")?(c=r._id,fetch("".concat(e.baseUrl,"/cards/likes/").concat(c),{method:"DELETE",headers:e.headers}).then(t)).then((function(e){o.target.classList.toggle("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){console.error("Произошла ошибка при удалении лайка:",e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}(r._id).then((function(e){o.target.classList.toggle("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){console.error("Произошла ошибка при добавлении лайка:",e)}))}var a=Array.from(document.querySelectorAll(".popup"));function i(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",l)}function u(e){e&&(e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l))}function l(e){if("Escape"===e.key){var t=a.find((function(e){return e.classList.contains("popup_is-opened")}));t&&u(t)}}function s(e){e.target===e.currentTarget&&u(e.target)}var d=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent="",t.setCustomValidity("")},p=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function f(e,t){var n=Array.from(e.querySelectorAll(".popup__input")),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){return d(e,n,t)})),p(n,o,t)}var _,m=document.querySelector(".places__list"),v=document.querySelector(".popup_type_edit"),y=v.querySelector(".edit-profile"),h=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),b=document.querySelector(".profile__image"),q=document.querySelector(".popup_type_avatar"),k=q.querySelector(".edit-avatar"),g=document.querySelector(".profile__image_container"),E=document.querySelector(".popup_type_new-card"),L=document.querySelector(".profile__add-button"),C=document.querySelector(".profile__edit-button "),x=document.querySelectorAll(".popup__close"),A=E.querySelector(".new-place"),U=document.querySelector(".popup__input_type_card-name"),T=document.querySelector(".popup__input_type_url"),w={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},B=function(e){h.textContent=e.name,S.textContent=e.about,b.style.backgroundImage="url(".concat(e.avatar,")")};function P(e){var t=e.link,n=e.name,o=e.title,r=document.querySelector(".popup_type_image"),c=r.querySelector(".popup__image");c.src=t,c.alt=n,r.querySelector(".popup__caption").textContent=o,i(r)}L.addEventListener("click",(function(){A.reset(),f(A,w),i(E)})),C.addEventListener("click",(function(){D(y,h.textContent,S.textContent),f(y,w),i(v)})),x.forEach((function(e){e.addEventListener("click",(function(){var t=e.closest(".popup_is-opened");t&&u(t)}))})),a.forEach((function(e){e.addEventListener("click",s)}));var D=function(e,t,n){e.elements.name.value=t,e.elements.description.value=n};function N(e,t){t.textContent=e?"Сохранение...":"Сохранить"}y.addEventListener("submit",(function(n){var o;n.preventDefault(),N(!0,y.querySelector(".popup__button")),(o={name:y.name.value,about:y.description.value},fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o.name,about:o.about})}).then(t)).then((function(e){B(e),u(v)})).catch((function(e){console.log(e)})).finally((function(){N(!1,y.querySelector(".popup__button"))}))})),A.addEventListener("submit",(function(n){var a;n.preventDefault(),N(!0,A.querySelector(".popup__button")),(a={name:U.value,link:T.value},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a.name,link:a.link})}).then(t)).then((function(e){var t=o(e,e.owner._id,r,c,P);m.prepend(t),u(E)})).catch((function(e){console.log(e)})).finally((function(){N(!1,A.querySelector(".popup__button"))}))})),g.addEventListener("click",(function(e){k.reset(),f(k,w),i(q)})),k.addEventListener("submit",(function(n){var o;n.preventDefault(),N(!0,k.querySelector(".popup__button")),(o=k.link.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})}).then(t)).then((function(e){B(e),u(q)})).catch((function(e){console.log(e)})).finally((function(){N(!1,k.querySelector(".popup__button"))}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(".popup__input")),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=t.validationMessage,o.classList.add(n.errorClass)}(e,t,n)}(e,r,t),p(n,o,t)}))}))}(t,e)}))}(w),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t=e[0];_=t._id;var n=e[1];B(t),function(e,t){e.forEach((function(e){var n=o(e,t,r,c,P);m.append(n)}))}(n,_)})).catch((function(e){console.log(e)}))})();