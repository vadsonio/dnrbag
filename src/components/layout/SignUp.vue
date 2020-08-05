<template>
  <div class="overlay">
    <ModalBox>
      <div class="sign-in">
        <h2 class="sign-in__title">Регистрация</h2>
        <div class="form">

          <div class="form-field">
            <font-awesome-icon class="form-field__iconPre" :icon="['far', 'user']" />
            <input
              type="text"
              class="form-field__input input-field"
              :class="{'error': $v.name.$error}"
              v-model.trim="name"
              @input="setName($event.target.value)"
              maxlength="30"
              placeholder="Введите своё имя...">
            <p class="input-field__helper-text error" v-if="nameValidation">Поле не должно быть пустым</p>
            <p class="input-field__helper-text error" v-if="!$v.name.minLength">Минимальная длина 3 символа</p>
          </div>

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
              :class="{'sign-in__button--active' : submitBtn}">Зарегистрироваться</button>
          <p class="sign-in__secondary-text">
            или
            <router-link class="sign-in__redirect-link" :to="{ path: '/signIn' }">
              Войдите
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
        name: "",
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
      ...mapActions(['signUp']),
      submitForm(){

        let user = {
          name: this.name,
          email: this.email,
          password: this.password
        }

        this.loadSpinner.onloadBlock = true;

        this.signUp(user).then(
          (success) => {
            this.loadSpinner.spiner = false;
            this.loadSpinner.text = "Готово! Входим..."

            setTimeout(()=>{
              this.$router.replace('/');
            }, 2000);
        },
          (errorText)=>{

            this.loadSpinner.onloadBlock = false;

            this.email = '';
            this.infoPopupText.showInfo = true;
            this.infoPopupText.textInfo = errorText;
            }
        );
      },
      setName(value){
        this.name = value
        this.$v.name.$touch()
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
      name: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      email:{
        required,
        email
      }
    },
    components: {
      ModalBox,
      InfoPopup
    },
    mounted(){
      // console.log(this.$v);
      // console.log(process.env.VUE_APP_SERVER_ADDRESS);
    },
    computed:{
      nameValidation(){
        return this.$v.name.$dirty && !this.$v.name.required
      },
      emailValidation(){
        return this.$v.email.$dirty && !this.$v.email.required
      },
      passwordValidation(){
        return this.$v.password.$dirty && !this.$v.password.required
      },
      submitBtn(){
        let nameFieldValidation,
            emailFieldValidation,
            passwordFieldValidation;

        this.name.length>0 && !this.$v.name.$error ? nameFieldValidation = true : nameFieldValidation = false;

        this.email.length>0 && !this.$v.email.$error ? emailFieldValidation = true : emailFieldValidation = false;

        this.password.length>0 && !this.$v.password.$error ? passwordFieldValidation = true : passwordFieldValidation = false;

        if(nameFieldValidation && emailFieldValidation && passwordFieldValidation){
          return true;
        }
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
      }
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