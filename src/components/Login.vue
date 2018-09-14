<template>
  <div>
    <div v-if="showLoginForm"id="login">
      <transition name="fade">
        <div v-if="performingRequest" class="loading">
            <p>Loading...</p>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="errMsg !== ''" class="loading">
            <p>{{errMsg}}</p>
        </div>
      </transition>
        <section>
            <div class="">
                <h1>Humanity</h1>
                <p>Welcome to Humanity, built with Vue.js, Firebase, Materialize and Github Pages.</p>
            </div>
            <div class="">
                <form @submit.prevent>
                    <h1>Welcome Back</h1>

                    <label for="email1">Email</label>
                    <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />

                    <label for="password1">Password</label>
                    <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />

                    <button @click="login" class="button">Log In</button>

                    <div class="">
                        <button>Forgot Password</button>
                        <button @click="toggleForm">Create an Account</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
    <div v-else class="" id="signup">
      <transition name="fade">
        <div v-if="performingRequest" class="loading">
            <p>Loading...</p>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="errMsg !== ''" class="loading">
            <p>{{errMsg}}</p>
        </div>
      </transition>
      <section>
        <form @submit.prevent>
          <h1>Get Started</h1>

          <label for="name">Name</label>
          <input v-model.trim="signupForm.name" type="text" placeholder="Savvy Apps" id="name" />

          <label for="email2">Email</label>
          <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />

          <label for="password2">Password</label>
          <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />

          <button @click="signup" class="button">Sign Up</button>

          <div class="extras">
              <button @click="toggleForm">Back to Log In</button>
          </div>
        </form>
    </section>
    </div>
  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')



export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        email: '',
        password: '',
      },
      showLoginForm: true,
      performingRequest: false,
      errMsg: ''
    }
  },
  methods: {
    login() {
      this.performingRequest = true
      fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
      .then(user => {
          this.$store.commit('setCurrentUser', user.user)
          this.$store.dispatch('fetchUserProfile')
          this.$router.push('/dashboard')
      }).catch(err => {
        this.errMsg = err.message
        this.performingRequest = false
      })

    },
    signup() {
      this.performingRequest = true
      fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password)
      .then(user => {
        this.$store.commit('setCurrentUser', user.user)

        // create user object
        fb.usersCollection.doc(user.user.uid).set({
          name: this.signupForm.name,
        }).then(() => {
          this.$store.dispatch('fetchUserProfile')
          this.$router.push('/dashboard')
        }).catch(err => {
          this.errMsg = err.message
          this.performingRequest = false
        })
      }).catch(err => {
        this.errMsg = err.message
        this.performingRequest = false
      })

    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
  }
}
</script>
