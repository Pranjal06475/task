import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-slate-50">
      <!-- Navigation -->
      <nav class="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/30 border-b border-white/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <a href="#" class="text-xl font-bold text-slate-900">TaskFlow</a>
            </div>
            <div class="flex items-center gap-4">
              <a routerLink="/login" class="text-sm font-medium text-slate-700 hover:text-primary-600 transition">Sign In</a>
              <a routerLink="/register" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-20">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <span class="w-2 h-2 rounded-full bg-primary-600"></span>
              New: Real-time collaboration features
            </div>
            <h1 class="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Manage Your Team's <span class="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Tasks Effortlessly</span>
            </h1>
            <p class="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              TaskFlow is a modern team task management platform that helps you organize, track, and collaborate on projects with ease.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a routerLink="/register" class="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition shadow-lg hover:shadow-xl">
                Start Free Trial
              </a>
              <a href="#features" class="px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 font-semibold rounded-lg hover:border-primary-300 transition">
                Learn More
              </a>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 rounded-3xl blur-3xl opacity-20 -z-10"></div>
            <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-1 shadow-2xl">
              <div class="bg-slate-950 rounded-2xl p-8 min-h-96 flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-24 h-24 text-primary-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                  </svg>
                  <p class="text-slate-400">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-slate-900 mb-4">Powerful Features</h2>
            <p class="text-xl text-slate-600">Everything you need to manage your team's work</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div class="p-8 bg-white rounded-2xl border border-slate-200 hover:border-primary-300 transition">
              <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Task Management</h3>
              <p class="text-slate-600">Create, assign, and track tasks with priorities, due dates, and status updates in real-time.</p>
            </div>

            <!-- Feature 2 -->
            <div class="p-8 bg-white rounded-2xl border border-slate-200 hover:border-primary-300 transition">
              <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Team Collaboration</h3>
              <p class="text-slate-600">Invite team members, assign roles, and collaborate seamlessly on projects together.</p>
            </div>

            <!-- Feature 3 -->
            <div class="p-8 bg-white rounded-2xl border border-slate-200 hover:border-primary-300 transition">
              <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Analytics &amp; Insights</h3>
              <p class="text-slate-600">Get comprehensive insights into task progress, team productivity, and project timelines.</p>
            </div>

            <!-- Feature 4 -->
            <div class="p-8 bg-white rounded-2xl border border-slate-200 hover:border-primary-300 transition">
              <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Lightning Fast</h3>
              <p class="text-slate-600">Built for speed and performance, with instant updates and responsive interface.</p>
            </div>

            <!-- Feature 5 -->
            <div class="p-8 bg-white rounded-2xl border border-slate-200 hover:border-primary-300 transition">
              <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Secure &amp; Private</h3>
              <p class="text-slate-600">Enterprise-grade security with encryption and role-based access control.</p>
            </div>

            <!-- Feature 6 -->
            <div class="p-8 bg-white rounded-2xl border border-slate-200 hover:border-primary-300 transition">
              <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">Easy Integration</h3>
              <p class="text-slate-600">Seamlessly integrates with your favorite tools and services.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl font-bold text-slate-900 mb-6">Ready to get started?</h2>
          <p class="text-xl text-slate-600 mb-8">Join thousands of teams already using TaskFlow to manage their work.</p>
          <a routerLink="/register" class="inline-block px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition shadow-lg hover:shadow-xl">
            Create Free Account
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div class="max-w-7xl mx-auto text-center text-slate-600">
          <p>&copy; 2024 TaskFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `
})
export class LandingComponent {}
