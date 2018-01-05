<?php

/**
 * Created by IntelliJ IDEA.
 * User: lidc
 * Date: 17-9-7
 * Time: 上午11:27
 */
class Controller_Activity extends \Base
{

    public function init()
    {
        parent::init(); // TODO: Change the autogenerated stub
    }

    /**
     * 点击统计
     * */
    public function clickCountAction()
    {

        $parameter = $this->_request->getPost();
        $this->enterData($parameter);
        $this->fn_return_json();
    }


    public function getSkinConfigAction()
    {
        $parameter = $this->_request->getPost();
        if (!isset($parameter['id'])) {
            $this->fn_return_json('', '10001');
        }

        $id = $parameter['id'];

        $return = $this->getGame($id);

        $Tdata['id'] = $id;

        $Tdata['random'] = isset($parameter['random']) ? $parameter['random'] : 0;

        $Tdata['action'] = 'getIdClick';

        $click_count = $this->enterData($Tdata);

        $isNew = false;

        if ($this->muber[$id]['limitTimes'] <= $click_count) {
            $isNew = true;
        }
        if($parameter['id']==4002)
        {
            $data = $return;
        }else{
            $data = array('skinConfig' => $return, 'isNew' => $isNew);
        }
        $this->fn_return_json($data, '成功');
    }

    /**
     * 游戏ID页奖品列表
     * */
    public function ajaxOptionsAction()
    {
        $parameter = $this->_request->getPost();
        if (!isset($parameter['id']) || !$parameter['id']) {
            $this->fn_return_json('', '10001');
        }

        $id = $parameter['id'];
        $Tdata['id'] = $id;
        $Tdata['random'] = isset($parameter['random']) ? $parameter['random'] : 0;

        $return = $this->getGame($id);

        //获取点击次数
        $Tdata['action'] = 'getIdClick';
        $click_count = $this->enterData($Tdata);

        //剩余点击数
        $surplusClick = $this->muber[$id]['limitTimes'] - $click_count;

        if ($surplusClick <= 0) {
            $surplusClick = 0;
            //抽奖为零时往redis压入游戏id值
            $Tdata['action'] = 'setRandomOverList';
            $this->enterData($Tdata);
        }

        $return['limitTimes'] = $surplusClick;

        $this->fn_return_json($return, '成功');
    }

    /**
     *  抽奖后返回的数据
     * */
    public function doJoinAction()
    {
        $parameter = $this->_request->getPost();

        if (!isset($parameter['id'])) {
            $this->fn_return_json('', '10001');
        }
        $id = $parameter['id'];

        $return = $this->getGame($parameter['id']);

        $Tdata['id'] = $id;

        $Tdata['random'] = isset($parameter['random']) ? $parameter['random'] : 0;

        $Tdata['action'] = 'getIdClick';

        $click_count = $this->enterData($Tdata);

        $surplusClick = $this->muber[$id]['limitTimes'] - $click_count;

        if ($surplusClick > 0) {
            $return['limitTimes'] = $surplusClick;

        } else {

            $return['limitTimes'] = 0;
        }

        $this->fn_return_json($return, '成功');
    }

    /**
     * 抽奖次数完
     * return 其它活动链接
     * */
    public function getRecommendAction()
    {
        $parameter = $this->_request->getPost();
        if ($parameter) {
            if (!isset($parameter['id']) || !isset($parameter['random'])) {
                $this->fn_return_json('', '10001');
            }

            $id = $parameter['id'];

            $Tdata['id'] = $id;
            $Tdata['random'] = $parameter['random'];
            $Tdata['action'] = 'getRandomOverList';
            //抽奖完的游戏id
            $type = $this->enterData($Tdata);
            if (!in_array($id, $type)) {
                $Tdata['action'] = 'setRandomOverList';
                $this->enterData($Tdata);
            }
        } else {
            //2421页面请求参数错误
            $type = [2421];
        }

        $result = array_diff(array_keys($this->muber), $type);
        if (!$result) {
            $result = array_rand($this->muber, 2);
        }

        if (count($result) != 2) {
            $result[] = array_rand($this->muber, 1);
            $result = array_unique($result);
            while (count($result) < 2) {
                $result[] = array_rand($this->muber, 1);
                $result = array_unique($result);
            }
        }

        $re = array_rand($result, 2);
        $data['block1'] = $this->muber[$result[$re[0]]]['info'];
        $data['block2'] = $this->muber[$result[$re[1]]]['info'];
        $data['block3'] = array(
            'title' => NULL,
            'bannerUrl' => NULL,
            'actUrl' => '',
        );
        $this->fn_return_json($data, '成功');
    }

    /**
     * 随机抽取中奖数据
     **/
    public function resultAction()
    {
        $parameter = $this->_request->getPost();
        if (!isset($parameter['id'])) {
            $this->fn_return_json('', '10001');
        }

        $return = $this->getDetails($parameter);

        //保存用户中奖奖品
        $this->setOrderId($parameter);
        //奖品中奖次数
        $this->setNumber();
        $this->fn_return_json($return, '成功');
    }

    public function getTokenAction()
    {
//        $parameter = $this->_request->getPost();
//        if (!isset($parameter['id'])) {
//            $this->fn_return_json('','10001');
//        }
        $return = $this->getGame(4002);
        exit(json_encode($return));
    }

    public function timingIndexAction()
    {
        $data = [
            'code' => 'E0400019',
            'desc' => "广告位插件按钮关闭",
            "data" => null,
            "success" => false
        ];
        exit(json_encode($data));
    }

    public function getBuoyAction()
    {
        $parameter = $this->_request->getPost();
        if (!isset($parameter['id'])) {
            $this->fn_return_json('', '10001');
        }
        $return = $this->getGame($parameter['id']);
        $this->fn_return_json($return, '成功');
    }

    public function getReturnPageAction()
    {
        $parameter = $this->_request->getQuery();
        if (!isset($parameter['id'])) {
            $this->fn_return_json('', '10001');
        }
        $return = $this->getGame($parameter['id']);
        $this->fn_return_json($return, '成功');
    }

    public function getAllSkinAction()
    {
        $parameter = $this->_request->getPost();
        if (!isset($parameter['id'])) {
            $this->fn_return_json('', '10001');
        }
        $return = $this->getGame($parameter['id']);
        $this->fn_return_json($return, '成功');
    }

    public function activityPagePerfAction()
    {
        $this->fn_return_json('', '成功');
    }

    public function responsiveIndexAction()
    {
        $parameter = $this->_request->getPost();
        if (!isset($parameter['id']) || !isset($parameter['random'])) {
            $this->fn_return_json('', '10001');
        }
        $re = $this->firstData($parameter);
        if($re){
            $this->fn_return_json('', '成功');
        }
        $return = $this->getGame($parameter['id']);
        $this->fn_return_json($return, '成功');
    }


    /**
     * 判断是否为第一次访问
     * */
    private function firstData($data)
    {
        $redis = new Component\Redis();
        $random = isset($data['random']) ? $data['random'] : 0;
        $key = "First_" . $random;
        $re = $redis->get($key);
        if($re) return 1;
        $redis->set($key,$random,86400);
        return 0;
    }

    /**
     * 游戏页面的奖品列表详情
     * */
    public function getPrizeDetailAction()
    {
        $parameter = $this->_request->getPost();
        if (!isset($parameter['optionId'])) {
            $this->fn_return_json();
        }
        $return = $this->getOptions($parameter['optionId']);
        $this->fn_return_json($return, '成功');
    }

    /**
     * 奖品列表详情
     * */
    public function getRecordAction()
    {
        $parameter = $this->_request->getQuery();
        if (!isset($parameter['orderId'])) {
            $this->fn_return_json();
        }

        $Tdata = new \Data();
        $details = $Tdata->details();

        if (!isset($details[$parameter['orderId']])) {
            $this->fn_return_json();
        }

        $result = $details[$parameter['orderId']];
        $file = APP_FILE . "/result/{$parameter['orderId']}/index.php";

        if (file_exists($file)) {
            $result['iosDownloadUrl'] = "/result/{$parameter['orderId']}";
            $result['androidDownloadUrl'] = "/result/{$parameter['orderId']}";
        }
        $this->fn_return_json($result, '成功');
    }

    /**
     * 我的奖品列表进入的详情页面
     * */
    public function indexRecordAction()
    {
        $parameter = $this->_request->getQuery();
        $orderId = isset($parameter['orderId']) ? $parameter['orderId'] : '';
        $data = new \Data();
        $details = $data->details();
        if (isset($details[$orderId])) {
            $this->redirect($details[$orderId]['androidDownloadUrl']);
            exit;
        }
        $this->redirect("/");
    }

    /**
     * 奖品列表分页
     * */
    public function getRecordListAction()
    {
        $parameter = $this->_request->getQuery();
        $currentPage = isset($parameter['currentPage']) ? $parameter['currentPage'] : 1;
        $random = isset($parameter['random']) ? $parameter['random'] : 0;
        if ($currentPage > 2) $currentPage = 1;
        $start = 0;
        $end = 50;
        if ($currentPage == 2) {
            $start = 50;
            $end = 86;
        }

        $data = [];

        $key = "InsetUser_" . $random;
        $redis = new Component\Redis();
        $list = $redis->SMEMBERS($key);
        $activity = $this->getActivity();
        foreach ($activity as $key => $value) {
            if (in_array($value['orderId'], $list)) {
                if ($key >= $start && $end > $key) {
                    $data[] = $value;
                }
            }
        }

        $reture = array('list' => $data,
            'curentPage' => $currentPage,
            'max' => 30, 'offset' => 0,
            'pageSize' => 30,
            'total' => null,
            'totalCount' => 34,
            'totalPage' => 2
        );
        $this->fn_return_json($reture, '成功');
    }


    /**
     * 4001
     * */
    public function dataAcquisitionAction()
    {
        $result = $this->getGame(0);
        $this->fn_return_json_4001($result);
    }

    /**
     * 返回初始的抽奖次数
     * */
    public function activityTimesInfoAction()
    {
        $parameter = $this->_request->getPost();
        $id = $parameter['id'];
        $Tdata['id'] = $id;
        $Tdata['random'] = isset($parameter['random']) ? $parameter['random'] : 0;

        //获取点击次数
        $Tdata['action'] = 'getIdClick';
        $click_count = $this->enterData($Tdata);

        //剩余点击数
        $surplusClick = $this->muber[$id]['limitTimes'] - $click_count;

        if ($surplusClick <= 0) {
            $surplusClick = 0;
            //抽奖为零时往redis压入游戏id值
            $Tdata['action'] = 'setRandomOverList';
            $this->enterData($Tdata);
        }

        $this->fn_return_json_4001($surplusClick);
    }

    public function getGeTuiUserInfoAction()
    {
        $result = $this->getGame(4001);
        $this->fn_return_json_4001(null);
    }

    /**
     *
     * */
    public function countInfoAction()
    {
        $result = $this->getGame(4001);
        $this->fn_return_json_4001($result);
    }

    /**
     * 空方法
     * */
    public function getInfoAction()
    {

    }

    /**
     * 返回中奖产品
     * */
    public function awardInfoAction()
    {
        $parameter = $this->_request->getPost();
        if (!isset($parameter['id']) || !$parameter['id']) $this->fn_return_json_4001('', '获取失败');
        //抽取中奖数据
        $return = $this->getDetails($parameter, 1);
        //保存用户中奖奖品
        $this->setOrderId($parameter);
        //奖品中奖次数
        $this->setNumber();
        $this->fn_return_json_4001($return);
    }

    /**
     * 抽奖后返回次数
     * */
    public function subtracttimesAction()
    {
        $parameter = $this->_request->getPost();
//        $parameter['random'] = 56835209428;
//        $parameter['id'] = 4001;
        if (!isset($parameter['id']) || !isset($parameter['random'])) $this->fn_return_json_4001(0);
        $id = $parameter['id'];
        $random = isset($parameter['random']) ? $parameter['random'] : 0;
        $Tdata['id'] = $id;
        $Tdata['random'] = $random;
        $pontion = [
            'id' => $id,
            'random' => $random,
            'option' => 1
        ];
        //压入抽奖次数
        $this->enterData($pontion);
        //获取点击次数
        $Tdata['action'] = 'getIdClick';
        $click_count = $this->enterData($Tdata);

        //剩余点击数
        $surplusClick = $this->muber[$id]['limitTimes'] - $click_count;

        if ($surplusClick <= 0) {
            $surplusClick = 0;
            //抽奖为零时往redis压入游戏id值
            $Tdata['action'] = 'setRandomOverList';
            $this->enterData($Tdata);
        }
        $this->fn_return_json_4001($surplusClick);
    }

    /**
     * 数据统计入库
     * */
    private function enterData($Tdata = [])
    {
        $dateTime = date("Y-m-d");

        $redis = new Component\Redis();

        /**
         * 获取游戏ID已抽奖次数
         * return int
         * */
        if (isset($Tdata['action']) && $Tdata['action'] == 'getIdClick') {
            $key = implode("_", array(
                $dateTime, $Tdata['id'], $Tdata['random']
            ));
            $click_count = $redis->get($key);
            if (!$click_count) {
                $click_count = 0;
            }
            return $click_count;
        }

        /**
         * 获取已抽完的游戏ID
         * return array()
         * */
        if (isset($Tdata['action']) && $Tdata['action'] == 'getRandomOverList') {
            $key = implode("_", array(
                $dateTime, $Tdata['random'], 'over_list'
            ));
            $number = $redis->SMEMBERS($key);
            return $number;
        }

        /**
         * 压入已抽完的游戏ID
         * return null
         *
         * */
        if (isset($Tdata['action']) && $Tdata['action'] == 'setRandomOverList') {
            $key = implode("_", array(
                $dateTime, $Tdata['random'], 'over_list'
            ));
            $redis->SADD($key, $Tdata['id']);
            return '';
        }

        $key_arr = array($dateTime);

        if (isset($Tdata['id'])) {
            $key_arr[] = $Tdata['id'];
        }

        if (isset($Tdata['random']) && $Tdata['random']) {
            $key_arr[] = $Tdata['random'];
        }

        if (isset($Tdata['order_id']) && $Tdata['order_id']) {
            $key_arr[] = $Tdata['order_id'];
        }

        //点击统计
        if (isset($Tdata['position'])) {
            if ($Tdata['position'] == 1 && !isset($Tdata['order_id'])) {
                $redis->INCR(implode("_", $key_arr));
            }
            $key_arr[] = $Tdata['position'];
        }

        $redis->INCR(implode("_", $key_arr));
        return "";
    }

    /**
     * 保存用户中奖奖品id
     * */
    public function setOrderId($data)
    {
        $redis = new Component\Redis();
        $random = isset($data['random']) ? $data['random'] : 0;
        $id = isset($data['id']) ? $data['id'] : '';
        $key = "InsetUser_" . $random;
        $redis->SADD($key, $this->orderId);
        $newTime = time();
        $endTime = strtotime(date('Y-m-d 23:59:59'));
        $afterTime = $endTime - $newTime;
        $redis->expire($key, $afterTime);
        $keys = "InsetProduct_" . $random . "_" . $id;
        $redis->SADD($keys, $this->orderId);
        $redis->expire($keys, $afterTime);
    }

    /**
     * 奖品中奖次数
     * */
    protected function setNumber()
    {
        $redis = new Component\Redis();
        $date = date('Y-m-d');
        $key = $date . "_" . $this->orderId;
        $redis->INCR($key);
    }

    private function fn_return_json($data = array(), $desc = '')
    {
        $json = array('code' => '0000000',
            'desc' => $desc,
            'success' => true,
            'data' => $data
        );
        exit(json_encode($json));
    }

    private function fn_return_json_4001($data, $msg = '成功')
    {
        $json = array('code' => 1,
            'success' => true,
            "message" => $msg,
            'data' => $data,
            'error' => false
        );
        echo json_encode($json);
        exit;
    }


}