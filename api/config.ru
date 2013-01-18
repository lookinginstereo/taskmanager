require 'rubygems'
require 'bundler'

Bundler.require

require "sinatra"
require "mongoid"
require 'json'
require './app'

run OCCApi