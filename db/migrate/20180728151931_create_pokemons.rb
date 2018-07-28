class CreatePokemons < ActiveRecord::Migration[5.2]
  def change
    create_table :pokemons do |t|
      t.integer :number
      t.string :name
      t.string :type_1
      t.string :type_2
      t.string :image
      t.string :evolution

      t.timestamps
    end
  end
end
