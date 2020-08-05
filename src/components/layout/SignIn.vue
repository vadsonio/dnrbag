<template>
  <div class="overlay">
    <ModalBox>
      <div class="sign-in">
        <h2 class="sign-in__title">Вход</h2>
        <div class="form">
          <div class="form-field">
            <font-awesome-icon class="form-field__iconPre" :icon="['far', envelopeIcon]" />
            <input
                type="text"
                class="input-field"
                :class="{'error': $v.email.$error}"
                v-model.trim="email"
                @input="setEmail($event.target.value)"
                placeholder="Введите свой email...">
            <p class="input-field__helper-text error" v-if="emailValidation">Поле не должно быть пустым</p>
            <p class="input-field__helper-text error" v-if="!$v.email.email">Необходим правильный формат email. Пример: test@test.ru</p>
          </div>
          <div class="form-field">
            <font-awesome-icon class="form-field__iconPre" :icon="['fas', lockIcon]" />
            <input
                type="password"
                class="input-field"
                :class="{'error': $v.password.$error}"
                v-model.trim="password"
                @input="setPassword($event.target.value)"
                placeholder="Введите свой пароль...">
            <p class="input-field__helper-text error" v-if="passwordValidation">Поле не должно быть пустым</p>
            <p class="input-field__helper-text error" v-if="!$v.password.minLength">Минимальная длина 6 символов</p>
          </div>

          <div class="load-spinner" v-if="loadSpinner.onloadBlock">
            <font-awesome-icon v-if="loadSpinner.spiner" class="load-spinner__icon" :icon="['fas', 'spinner']" />
            <div class="load-spinner__text">
              {{loadSpinner.text}}
            </div>
          </div>

          <InfoPopup v-if="infoPopupText.showInfo" :infoText="infoPopupText.textInfo"/>

          <button
                @click="submitForm"
                class="sign-in__button  button"
                :class="{'sign-in__button--active' : submitBtn}">Войти</button>
          <p class="sign-in__secondary-text">
            или
            <router-link class="sign-in__redirect-link" :to="{ path: '/signUp' }">
              Зарегистрируйтесь
            </router-link>
          </p>
        </div>
      </div>
    </ModalBox>
  </div>
</template>

<script>
  import ModalBox from '@/components/ui/ModalBox';
  import InfoPopup from '@/components/ui/InfoPopup';
  import ButtonLink from '@/components/ui/ButtonComponent';

  import { required, minLength, email } from 'vuelidate/lib/validators';

  import { mapGetters, mapMutations, mapActions } from 'vuex';

  export default{
    data(){
      return{
        email: "",
        password: "",
        infoPopupText: {
          showInfo: false,
          textInfo: ""
        },
        loadSpinner: {
          onloadBlock: false,
          spiner: true,
          text: ""
        }
      }
    },
    methods:{
      ...mapActions(['signIn']),
      submitForm(){
        let user = {
          email: this.email,
          password: this.password
        }

        this.loadSpinner.onloadBlock = true;

        this.signIn(user).then(
          (success) => {
            this.infoPopupText.showInfo = false;
            this.infoPopupText.textInfo = '';

            this.loadSpinner.spiner = false;
            this.loadSpinner.text = "Готово! Входим..."

            setTimeout(()=>{
              this.$router.replace('/');
            }, 2000);

          },
          (errorText)=>{
            this.loadSpinner.onloadBlock = false;

            this.$v.$reset();

            this.email = "";
            this.password = "";

            this.infoPopupText.showInfo = true;
            this.infoPopupText.textInfo = errorText;
          }
        );
      },
      setEmail(value){
        this.email = value
        this.$v.email.$touch()
      },
      setPassword(value){
        this.password = value
        this.$v.password.$touch()
      }
    },
    validations: {
      password: {
        required,
        minLength: minLength(6)
      },
      email:{
        required,
        email
      }
    },
    computed:{
      emailValidation(){
        return this.$v.email.$dirty && !this.$v.email.required
      },
      passwordValidation(){
        return this.$v.password.$dirty && !this.$v.password.required
      },
      envelopeIcon(){
        if(this.email.length>0){
          return 'envelope-open'
        } else{
          return 'envelope'
        }
      },
      lockIcon(){
        if(this.password.length>0){
          return 'unlock'
        } else{
          return 'lock'
        }
      },
      submitBtn(){
        if(this.email.length>0 && this.password.length>0){
          return true;
        } else {
          return false;
        }
      }
    },
    components: {
      ModalBox,
      InfoPopup
    }
  }

</script>

<style lang="scss">
.sign-in{
  text-align: center;
  &__title{
    font-size: 20px;
    color: $linkColor;
  }
  &__button{
    min-width: 120px;
    pointer-events: none;
    user-select: none;
    background: #ddd!important;
    &--active{
      user-select: auto;
      pointer-events: auto;
      background: $linkColor!important;
    }
  }
  &__secondary-text{
    font-size: 14px;
    color: #666;
  }
  &__redirect-link{
    font-size: 14px;
    text-decoration: underline;
    color: $linkColor;
  }
}
</style>