require 'json'
require 'open-uri'
require 'pry'

puts "Cleaning database..."

Pokemon.destroy_all

puts "Creating pokemons..."

url_list = "http://pokeapi.co/api/v2/pokemon-form/"
pokemon_list = open(url_list).read

JSON.parse(pokemon_list)["results"].each do |info|
    
    url_details = info["url"]
    pokemon_details = open(url_details).read

    Pokemon.create!(name: info["name"],
        number: JSON.parse(pokemon_list)["results"].index(info) + 1,
        image: JSON.parse(pokemon_details)["sprites"]["front_shiny"],
        type_1: JSON.parse(pokemon_details)["version_group"]["name"])
end

puts "#{Pokemon.count} pokemons created"
puts "Done"
