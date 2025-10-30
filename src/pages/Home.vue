<template>
    <div class="container my-5">
      <h1 class="text-center mb-4">Football Competitions</h1>
  
      <!-- Loading State -->
      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
  
      <!-- Error State -->
      <div v-else-if="error" class="alert alert-danger text-center">
        {{ error }}
      </div>
  
      <!-- Competitions Grid -->
      <div v-else class="row g-4">
        <div
          v-for="competition in competitions"
          :key="competition.id"
          class="col-md-4 col-lg-3"
        >
          <div class="card h-100 shadow-sm border-0">
            <!-- Emblem -->
            <img
              v-if="competition.emblem"
              :src="competition.emblem"
              class="card-img-top p-3"
              alt="Competition emblem"
              style="height: 120px; object-fit: contain;"
            />
            <div v-else class="text-center p-4 bg-light">
              <small class="text-muted">No Emblem</small>
            </div>
  
            <!-- Details -->
            <div class="card-body">
              <h5 class="card-title">{{ competition.name }}</h5>
              <p class="card-text mb-1">
                <strong>Area:</strong>
                <img
                  v-if="competition.area.flag"
                  :src="competition.area.flag"
                  alt="Flag"
                  width="20"
                  class="me-1"
                />
                {{ competition.area.name }}
              </p>
              <p class="card-text mb-1">
                <strong>Type:</strong> {{ competition.type }}
              </p>
              <p class="card-text mb-1">
                <strong>Start:</strong> {{ formatDate(competition.currentSeason?.startDate) }}
              </p>
              <p class="card-text mb-0">
                <strong>End:</strong> {{ formatDate(competition.currentSeason?.endDate) }}
              </p>
            </div>
  
            <!-- Footer -->
            <div class="card-footer text-muted small">
              Last Updated: {{ formatDate(competition.lastUpdated) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, inject } from "vue";
  
  const axios = inject("axios"); // ✅ Using global axios provided in main.js
  const competitions = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString();
  };
  
  onMounted(async () => {
    try {
      // ✅ Use relative path since baseURL is already set
      const response = await axios.get("/v4/competitions");
      competitions.value = response.data.competitions;
    } catch (err) {
      console.error("API Error:", err);
      error.value = "Failed to fetch competitions.";
    } finally {
      loading.value = false;
    }
  });
  </script>
  
  <style scoped>
  .card {
    border-radius: 12px;
    transition: transform 0.2s ease-in-out;
  }
  .card:hover {
    transform: translateY(-4px);
  }
  </style>
  