class SocketSignals {
    static ctsMainStart(){
      return "ctsMainStart";
    }

    static ctsMain(){
      return "ctsMain";
    }

    static ctsCon(){
      return "ctsCon";
    }

    static stcMainRoomID(){
      return "stcMainRoomID";
    }
    
    static stcMainPlayerLogin(){
        return "stcMainPlayerLogin";
    }
};

module.exports = SocketSignals;
