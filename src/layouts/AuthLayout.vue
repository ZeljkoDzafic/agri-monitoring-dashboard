<template>
  <v-app>
    <v-main class="d-flex align-center justify-center bg-grey-lighten-4">
      <v-container fluid class="pa-4">
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
