Mongoid.load!("mongoid.yml", :development)

class OCCApi < Sinatra::Base
  
  get '/' do
    "Welcome to the API"
  end
  
  # get all tasks lists
  get '/lists' do
    content_type :json
    all_lists = Tasklist.all
    all_lists.to_json
  end

  # create a new task list
  post '/lists/:listname' do
    listname = params[:listname]
    Tasklist.new(title: listname).save
  end

  delete "/lists/:id" do
    id = params[:id]
    Tasklist.where(id: id).delete
    return "#{id} has been deleted"
  end

end


class Tasklist
  include Mongoid::Document

  # field :id, type: Integer
  field :title, type: String

  embeds_many :tasks
end

class Task
  include Mongoid::Document

  # field :id, type: Integer
  field :title, type: String

  embedded_in :tasklist
end