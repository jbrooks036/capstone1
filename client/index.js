(function(){
  'use strict';

  angular.module('capstone1', ['ngRoute', 'LocalForageModule', 'angularFileUpload', 'mgcrea.ngStrap'])
  .config(['$routeProvider', '$httpProvider', '$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/about', {templateUrl:'/views/about/about.html', controller:'AboutCtrl'})
    .when('/register', {templateUrl:'/views/register/register.html', controller:'RegisterCtrl'})
    .when('/login',    {templateUrl:'/views/login/login.html',       controller:'LoginCtrl'})
    .when('/logout',   {templateUrl:'/views/logout/logout.html',     controller:'LogoutCtrl'})
    .when('/projects', {templateUrl:'/views/projects/projects.html', controller:'ProjectsCtrl'})
    .when('/projects/new', {templateUrl:'/views/projects/new.html', controller:'ProjectsCtrl'})
    .when('/projects/:projectId', {templateUrl:'/views/projects/show.html', controller:'ProjectsCtrl'})
    .otherwise({redirectTo:'/'});

    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'capstone1', storeName:'cache', version:1.0});
  }]);
})();

