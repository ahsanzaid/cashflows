<?php
   class Cashflow {
      /* Member variables */
      var $id;
      var $activity;
      var $type;
      var $amount;
      var $date;
      /* Member functions */
      function addCashflow(){
         $this->price = $par;
      }
      function getPrice(){
         echo $this->price ."<br/>";
      }
      function setName($par){
         $this->title = $par;
      }
      function getName(){
         echo $this->title ." <br/>";
      }
   }
$Samsung = new Cashflows();
$Xiaomi = new Cashflows();
$Iphone = new Cashflows();
$Samsung->setName( "SamsungS8");
$Xiaomi->setName( "MI4" );
$Samsung->setPrice( 90000 );
$Iphone->setPrice( 65000 );
$Xiaomi->setPrice( 15000 );
//Now you call another member functions to get the values set by in above example
$Samsung->getName();
$Iphone->getName();
$Xiaomi->getName();
$Samsung->getPrice();
$Iphone->getPrice();
$Xiaomi->getPrice();
?>